import Heap from './Heap'

export default function DijkstraSolver(maze) {
    const minHeap = new Heap((c1, c2) => c1.distance < c2.distance);
    const startCell = maze.getStartCell();
    const finishCell = maze.getFinishCell();
    const fIndex = maze.index(finishCell.x, finishCell.y);
    const visited = [];
    const mazeSize = maze.getSize();
    const edgeDistance = 1;

    startCell.distance = 0;
    for(let i=0; i < mazeSize; i++) {
        if(maze.maze[i].state !== 'w') {
            minHeap.insert(maze.maze[i]);
            visited[i] = false;
        } 
    }

    return {
        updateSearch: function() {
            let currentCell = minHeap.extract();
            currentCell.state = 'c';
            let currentCellIndex = maze.index(currentCell.x, currentCell.y);
            visited[currentCellIndex] = true;

            // If finish is not found because a wall is blocking
            if(currentCell.distance === Number.MAX_VALUE) {
                // Empty the array to show that path was not found
                minHeap.data.length = 0; 
                return false;
            }

            // If finish cell is found
            if (visited[fIndex]) {
                //logic for shortest path
                let pathCell = finishCell;
                while(pathCell.parent) {
                    pathCell.state = 'path';
                    pathCell = pathCell.parent;
                }
                finishCell.state = 'f'
                startCell.state = 's';

                return true;
            }

            // Search All neighbors
            let neighbors = maze.findAllNeighbors(currentCell);
            for (let n of neighbors) {
                let nIndex = maze.index(n.x, n.y);
                if (!visited[nIndex]) {
                    let tentativeDistance = currentCell.distance + edgeDistance;
                    if(tentativeDistance < n.distance) {
                        n.distance = tentativeDistance;
                        n.parent = currentCell;
                        minHeap.remove(n);
                        minHeap.insert(n);
                    }
                    n.state = 'stack';
                }
            }

            currentCell.state = 'c';

            return false;
        },
        list: minHeap.data
    }
}