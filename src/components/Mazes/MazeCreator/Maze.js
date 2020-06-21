import Cell from './Cell'

export default class Maze {

    constructor(cols, rows, cellWidth, ctx) {
        this.maze = [];
        this.rows = rows;
        this.cols = cols;
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
        this.startCell.state = 's';
        this.finishCell = this.maze[this.maze.length - 1];
        this.finishCell.state = 'f';
    }

    clearMaze = () => {
        this.clear();
        for(var cell of this.maze) {
            cell.parent = null;
            cell.distance = Number.MAX_VALUE;
            if(cell.state === 'w' || cell.state === 'path' || cell.state === 'stack' || cell.state === 'c')
                cell.state = 'e';
        }
        this.startCell.state = 's';
        this.finishCell.state = 'f';

        this.draw();
    }
    reset = () => {
        this.clear();
        for(var cell of this.maze) {
            cell.parent = null;
            cell.distance = Number.MAX_VALUE;
            if(cell.state === 'path' || cell.state === 'stack' || cell.state === 'c')
                cell.state = 'e';
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

        // Did in seperate for loop to avoid drawing overlap
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
        const top = this.getCell(cell.x, cell.y - 1);
        const topLeft = this.getCell(cell.x - 1, cell.y - 1);
        const topRight = this.getCell(cell.x + 1, cell.y - 1);
        const right = this.getCell(cell.x + 1, cell.y);
        const bottom = this.getCell(cell.x, cell.y + 1);
        const bottomLeft = this.getCell(cell.x - 1, cell.y + 1);
        const bottomRight = this.getCell(cell.x + 1, cell.y + 1);
        const left = this.getCell(cell.x - 1, cell.y);

        const neighbors = [];

        if (top && top.state !== 'w') {
            neighbors.push(top)
        }

        if (topLeft && topLeft.state !== 'w') {
            neighbors.push(topLeft)
        }

        if (topRight && topRight.state !== 'w') {
            neighbors.push(topRight)
        }

        if (left && left.state !== 'w') {
            neighbors.push(left)
        }

        if (right && right.state !== 'w') {
            neighbors.push(right)
        }

        if (bottomLeft && bottomLeft.state !== 'w') {
            neighbors.push(bottomLeft)
        }

        if (bottomRight && bottomRight.state !== 'w') {
            neighbors.push(bottomRight)
        }

        if (bottom && bottom.state !== 'w') {
            neighbors.push(bottom)
        }

        return neighbors;
    }

    handleCellClick = (x,y) => {
        const currentCell = this.getCell(x,y);
        const cellState = currentCell.state;
        if (cellState === 'e')
            currentCell.state = 'w';
        if (cellState === 'w')
            currentCell.state = 'e';
        this.draw();
    }
}
