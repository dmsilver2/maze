import Heap from '../shared/Heap';

export default function AStarSolver(maze) {
    const startCell = maze.getStartCell();
    const finishCell = maze.getFinishCell();
    const mazeSize = maze.getSize();
    const edgeDistance = 1;

    function h(cell) {
        return Math.max(Math.abs(cell.x - finishCell.x), Math.abs(cell.y - finishCell.y));
    }

    const openSet = new Heap((cell1, cell2) => {
        const fScore1 = cell1.gScore + cell1.hScore;
        const fScore2 = cell2.gScore + cell2.hScore;

        return (fScore1 < fScore2) || (fScore1 === fScore2 && cell1.hScore < cell2.hScore);
    });

    for(let i = 0; i < mazeSize; i++) {
        maze.maze[i].gScore = Number.MAX_VALUE;
        maze.maze[i].hScore = Number.MAX_VALUE;
    }

    startCell.gScore = 0;
    startCell.hScore = h(startCell);
    openSet.insert(startCell);

    return {
        updateSearch: function() {
            // handles case where all cells are visited
            if(openSet.data.length > 0) {
                let currentCell = openSet.extract();
                currentCell.state = 'c';

                if(currentCell === finishCell) {
                    // Reconstruct path
                    let pathCell = finishCell;
                    while (pathCell.parent) {
                        pathCell.state = 'path';
                        pathCell = pathCell.parent;
                    }

                    finishCell.state = 'f'
                    startCell.state = 's';
                    return true;
                }

                let neighbors = maze.findAllNeighbors(currentCell);
                for (let n of neighbors) {
                    let tentativeScore = currentCell.gScore + edgeDistance;
                    if(tentativeScore < n.gScore) {
                        n.parent = currentCell;
                        n.gScore = tentativeScore;
                        n.hScore = h(n);
                        let index = openSet.cellIndex(n)
                        if(index === -1) {
                            openSet.insert(n);
                            n.state = 'stack';
                        } else {
                            openSet.bubbleUp(index);
                        }
                    }
                }
            }
            return false;
        },
        list: openSet.data
    }

}