export default function DfsSolver (maze) {
    const startCell = maze.getStartCell();
    const stack = [startCell];
    const finishCell = maze.getFinishCell();
    let visited = []
    visited[maze.index(startCell.x, startCell.y)] = true;


    return {
        updateSearch: function() {
            let current = stack.pop();
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
                    stack.push(n);
                }
            }

            return false;
        },
        list: stack
    };
}