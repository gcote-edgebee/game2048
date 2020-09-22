class Tile {
  constructor(position, value, uid) {
    this.x = position.x;
    this.y = position.y;
    this.value = value || 2;
    this.uid = uid || Tile.createUid();

    this.previousPosition = null;
    this.mergedFrom = null;
    this.isMerge = Boolean(uid);
  }

  savePosition() {
    this.previousPosition = { x: this.x, y: this.y };
  }

  updatePosition(position) {
    this.x = position.x;
    this.y = position.y;
  }

  serialize() {
    return {
      position: {
        x: this.x,
        y: this.y
      },
      value: this.value,
      uid: this.uid,
      isMerge: this.isMerge
    };
  }

  static createUid() {
    return `tile-${++Tile.nextUid}`;
  }
}
Tile.nextUid = 0;

class Grid {
  constructor(size, previousState) {
    this.size = size;
    this.cells = previousState ? this.fromState(previousState) : this.empty();
  }

  empty() {
    const cells = [];

    for (let x = 0; x < this.size; ++x) {
      const row = (cells[x] = []);
      for (let y = 0; y < this.size; ++y) {
        row.push(null);
      }
    }

    return cells;
  }

  fromState(state) {
    const cells = [];

    for (let x = 0; x < this.size; ++x) {
      const row = (cells[x] = []);

      for (let y = 0; y < this.size; ++y) {
        const tile = state[x][y];
        row.push(tile ? new Tile(tile.position, tile.value) : null);
      }
    }

    return cells;
  }

  randomAvailableCell() {
    const cells = this.availableCells();

    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  }

  availableCells() {
    const cells = [];

    this.eachCell(function(x, y, tile) {
      if (!tile) {
        cells.push({ x: x, y: y });
      }
    });

    return cells;
  }

  eachCell(callback) {
    for (let x = 0; x < this.size; ++x) {
      for (let y = 0; y < this.size; ++y) {
        callback(x, y, this.cells[x][y]);
      }
    }
  }

  mapCell(callback) {
    const res = [];
    for (let x = 0; x < this.size; ++x) {
      for (let y = 0; y < this.size; ++y) {
        res.push(callback(x, y, this.cells[x][y]));
      }
    }
    return res;
  }

  cellsAvailable() {
    return this.availableCells().length > 0;
  }

  cellAvailable(cell) {
    return !this.cellOccupied(cell);
  }

  cellOccupied(cell) {
    return Boolean(this.cellContent(cell));
  }

  cellContent(cell) {
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y];
    } else {
      return null;
    }
  }

  insertTile(tile) {
    this.cells[tile.x][tile.y] = tile;
  }

  removeTile(tile) {
    this.cells[tile.x][tile.y] = null;
  }

  withinBounds(position) {
    return (
      position.x >= 0 &&
      position.x < this.size &&
      position.y >= 0 &&
      position.y < this.size
    );
  }

  serialize() {
    const cellState = [];

    for (let x = 0; x < this.size; ++x) {
      const row = (cellState[x] = []);

      for (let y = 0; y < this.size; ++y) {
        row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
      }
    }

    return {
      size: this.size,
      cells: cellState
    };
  }
}

const MOVEMENT_STRING_TO_INT = {
  up: 0,
  right: 1,
  down: 2,
  left: 3
};

const MOVEMENT = {
  0: { x: 0, y: -1 }, // Up
  1: { x: 1, y: 0 }, // Right
  2: { x: 0, y: 1 }, // Down
  3: { x: -1, y: 0 } // Left
};

export default class Game {
  constructor(size, existingState) {
    this.size = size;
    this.startTiles = 2;
    this.setup(existingState);
  }

  restart() {
    this.setup(null, this.bestScore);
  }

  doKeepPlaying() {
    this.keepPlaying = true;
  }

  isGameTerminated() {
    return this.over || (this.won && !this.keepPlaying);
  }

  setup(previousState, bestScore) {
    // Reload the game from a previous game if present
    if (previousState) {
      this.grid = new Grid(previousState.grid.size, previousState.grid.cells);
      this.score = previousState.score;
      this.bestScore = previousState.bestScore;
      this.over = previousState.over;
      this.won = previousState.won;
      this.keepPlaying = previousState.keepPlaying;
    } else {
      this.grid = new Grid(this.size);
      this.score = 0;
      this.bestScore = bestScore || 0;
      this.over = false;
      this.won = false;
      this.keepPlaying = false;

      this.addStartTiles();
    }
  }

  addStartTiles() {
    for (let i = 0; i < this.startTiles; ++i) {
      this.addRandomTile();
    }
  }

  addRandomTile() {
    if (this.grid.cellsAvailable()) {
      const value = Math.random() < 0.9 ? 2 : 4;
      const tile = new Tile(this.grid.randomAvailableCell(), value);

      this.grid.insertTile(tile);
    }
  }

  serialize() {
    return {
      grid: this.grid.serialize(),
      score: this.score,
      bestScore: this.bestScore,
      over: this.over,
      won: this.won,
      keepPlaying: this.keepPlaying
    };
  }

  prepareTiles() {
    this.grid.eachCell(function(x, y, tile) {
      if (tile) {
        tile.mergedFrom = null;
        tile.savePosition();
      }
    });
  }

  moveTile(tile, cell) {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  }

  move(strDirection) {
    if (this.isGameTerminated()) return;

    const direction = MOVEMENT_STRING_TO_INT[strDirection];

    const vector = this.getVector(direction);
    const traversals = this.buildTraversals(vector);
    let moved = false;

    this.prepareTiles();

    traversals.x.forEach(x => {
      traversals.y.forEach(y => {
        const cell = { x: x, y: y };
        const tile = this.grid.cellContent(cell);

        if (tile) {
          const positions = this.findFarthestPosition(cell, vector);
          const next = this.grid.cellContent(positions.next);

          tile.isMerge = false;

          // Only one merger per row traversal?
          if (next && next.value === tile.value && !next.mergedFrom) {
            const merged = new Tile(positions.next, tile.value * 2, tile.uid);
            merged.mergedFrom = [tile, next];

            this.grid.insertTile(merged);
            this.grid.removeTile(tile);

            tile.updatePosition(positions.next);

            this.score += merged.value;
            if (this.score > this.bestScore) {
              this.bestScore = this.score;
            }

            if (merged.value === 32) {
              console.log("WHOWHWOWHWO")
              this.won = true;
            }
          } else {
            this.moveTile(tile, positions.farthest);
          }

          if (!this.positionsEqual(cell, tile)) {
            moved = true;
          }
        }
      });
    });

    if (moved) {
      this.addRandomTile();

      if (!this.movesAvailable()) {
        this.over = true;
      }
    }
  }

  getVector(direction) {
    return MOVEMENT[direction];
  }

  buildTraversals(vector) {
    const traversals = { x: [], y: [] };

    for (let pos = 0; pos < this.size; ++pos) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  }

  findFarthestPosition(cell, vector) {
    let previous;

    // Progress towards the vector direction until an obstacle is found
    do {
      previous = cell;
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.grid.withinBounds(cell) && this.grid.cellAvailable(cell));

    return {
      farthest: previous,
      next: cell // Used to check if a merge is required
    };
  }

  movesAvailable() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  }

  tileMatchesAvailable() {
    for (let x = 0; x < this.size; ++x) {
      for (let y = 0; y < this.size; ++y) {
        const tile = this.grid.cellContent({ x: x, y: y });
        if (tile) {
          for (let direction = 0; direction < 4; ++direction) {
            const vector = this.getVector(direction);
            const cell = { x: x + vector.x, y: y + vector.y };
            const other = this.grid.cellContent(cell);

            if (other && other.value === tile.value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }

    return false;
  }

  positionsEqual(first, second) {
    return first.x === second.x && first.y === second.y;
  }
}
