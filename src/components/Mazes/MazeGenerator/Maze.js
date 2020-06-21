import Cell from './Cell'

export default class Maze {

    constructor(cols, rows, cellWidth, ctx) {
        this.maze = [];
        this.rows = rows;
        this.cols = cols;
        this.ctx = ctx;
        this.cellWidth = cellWidth;

        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                var cell = new Cell(x,y)
                this.maze.push(cell);
            }
        }
        this.startCell = this.maze[0];
        this.finishCell = this.maze[this.maze.length - 1];
    }

    reset = () => {
        this.clear();
        for(var cell of this.maze){
            cell.parent = null;
            cell.state = 'e';
            cell.distance = Number.MAX_VALUE;
        }
        this.startCell.state = 's';
        this.finishCell.state = 'f';

        this.draw();
    }

    clear = () => {
        this.ctx.clearRect(this.cols, this.height, this.cellWidth, this.cellWidth);
    }

    draw = () => {
        this.clear();
        for (var cell of this.maze) {
            cell.draw(this.cellWidth, this.ctx);
        }

        for (var cell of this.maze) {
            cell.drawParentArrow(this.cellWidth, this.ctx);
        }
    }

    index = (x,y) => {
        if(x < 0 || y < 0 || x > this.cols -1  || y > this.rows - 1)
            return -1;

        return x + y * this.cols;
    }

    getCell = (x,y) => {
        return this.maze[this.index(x,y)];
    }

    getStartCell = () => this.startCell;

    getFinishCell = () => this.finishCell;

    getSize = () => this.maze.length;

    findAllNeighbors = (cell) => {
        const top = this.getCell(cell.x, cell.y -1);
        const right = this.getCell(cell.x + 1, cell.y);
        const bottom = this.getCell(cell.x, cell.y +1);
        const left = this.getCell(cell.x - 1, cell.y);

        const neighbors = [];

        if (!cell.walls[0] && top) {
            neighbors.push(top)
        }

        if (!cell.walls[3] && left) {
            neighbors.push(left)
        }

        if (!cell.walls[1] && right) {
            neighbors.push(right)
        }

        if (!cell.walls[2] && bottom) {
            neighbors.push(bottom)
        }

        return neighbors;
    }

    removeWall = (cellA, cellB) => {
        var x = cellA.x - cellB.x;

        if (x === 1) {
            cellA.walls[3] = false;
            cellB.walls[1] = false;
        } else if (x === -1) {
            cellA.walls[1] = false;
            cellB.walls[3] = false;
        }

        var y = cellA.y - cellB.y;

        if (y === 1) {
            cellA.walls[0] = false;
            cellB.walls[2] = false;
        } else if (y === -1) {
            cellA.walls[2] = false;
            cellB.walls[0] = false;
        }
    }
}