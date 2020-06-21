export default class MinHeap {
    constructor(comparator) {
        this.data = [];
        this.comparator = comparator;
    }

    cellIndex = (cell) => {
        return this.data.findIndex(c => c === cell);
    }

    insert = (cell) => {
        this.data.push(cell);
        this.bubbleUp(this.data.length - 1);
    }

    remove = (cell) => {
        const length = this.data.length;
        for(let i = 0; i < length; i++) {
            if(cell !== this.data[i]) continue;

            let end = this.data.pop();
            if (i === length - 1) break;

            this.data[i] = end;
            this.bubbleUp(i);
            this.sinkDown(i);
            break;
        }
    }

    bubbleUp = (index) => {
        while (index > 0) {
            // get the parent
            let parent = Math.floor((index + 1) / 2) - 1;

            // if parent is greater than child
            if (this.comparator(this.data[index], this.data[parent])) {
                // swap
                let temp = this.data[parent];
                this.data[parent] = this.data[index];
                this.data[index] = temp;
            }

            index = parent;
        }
    }

    extract = () => {
        let root = this.data[0];

        if(this.data.length ===1) {
            this.data.pop();
        } else {
            this.data[0] = this.data.pop();
            this.sinkDown(0);
        }

        return root;
    }

    sinkDown = (index) => {
        while (true) {
            let child = (index + 1) * 2;
            let sibling = child - 1;
            let toSwap = null;

            // if current is greater than child
            if (this.data[child] && this.comparator(this.data[child], this.data[index])) {
                toSwap = child;
            }

            // if sibling is smaller than child, but also smaller than current
            if (this.data[child] && this.data[sibling] && this.comparator(this.data[sibling], this.data[index]) && this.comparator(this.data[sibling], this.data[child])) {
                toSwap = sibling;
            }

            // if we don't need to swap, then break.
            if (toSwap == null) {
                break;
            }

            let temp = this.data[toSwap];
            this.data[toSwap] = this.data[index];
            this.data[index] = temp;

            index = toSwap;
        }
    }
}
