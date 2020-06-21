import Maze from './Maze';

export default function dfsMazeGenerator(cols, rows, cellWidth, ctx) {
    const maze = new Maze(cols, rows, cellWidth, ctx);
    let current = maze.getStartCell();
    current.visited = true;
    let next = {};
    const stack = [];

    const findRandomNeighbor = (cell) => {
        const top = maze.getCell(cell.x, cell.y - 1);
        const right = maze.getCell(cell.x + 1, cell.y);
        const bottom = maze.getCell(cell.x, cell.y + 1);
        const left = maze.getCell(cell.x - 1, cell.y);

        const neighbors = [];

        if (top && !top.visited) {
            neighbors.push(top)
        }

        if (right && !right.visited) {
            neighbors.push(right)
        }

        if (bottom && !bottom.visited) {
            neighbors.push(bottom)
        }

        if (left && !left.visited) {
            neighbors.push(left)
        }

        if (neighbors.length) {
            var r = Math.floor(Math.random() * neighbors.length)
            return neighbors[r];
        } else {
            return null;
        }
    }

    const animate = () => {
        next = findRandomNeighbor(current);

        if (next) {
            current.state = 'stack';
            stack.push(current);
            maze.removeWall(current, next);
            current = next;
            current.visited = true;
        } else if (stack.length) {
            current = stack.pop();
            current.state = 'e';
        }
    }


    return {
        maze,
        animate,
        stack
    }
}

