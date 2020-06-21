export default function BfsSolver(maze) {
    const startCell = maze.getStartCell();
    const queue = [startCell];
    const finishCell = maze.getFinishCell();
    const visited = []
    visited[maze.index(startCell.x, startCell.y)] = true;


    return {
        updateSearch: function() {
            let current = queue.pop();
            if (current === finishCell) {
                current.state = 'f';
                startCell.state = 's';
                return true;
            }
            current.state = 'path';

            let neighbors = maze.findAllNeighbors(current);
            for (let n of neighbors) {
                if (!visited[maze.index(n.x, n.y)]) {
                    n.state = 'stack';
                    visited[maze.index(n.x, n.y)] = true;
                    queue.unshift(n);
                }
            }

            return false;
        },
        list: queue
    }
}