export default class Cell {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.state = 'e';
        this.distance = Number.MAX_VALUE;
    }

    draw = (width, ctx) => {
        let x = this.x * width;
        let y = this.y * width;

        // Top Line
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.stroke();

        // Right Line
        ctx.beginPath();
        ctx.moveTo(x + width, y);
        ctx.lineTo(x + width, y + width);
        ctx.stroke();

        // Bottom Line
        ctx.beginPath();
        ctx.lineTo(x + width, y + width);
        ctx.lineTo(x, y + width);
        ctx.stroke();

        // Left Line
        ctx.beginPath();
        ctx.lineTo(x, y + width);
        ctx.lineTo(x, y);
        ctx.stroke();

        let color = 'white';
        switch (this.state) {
            case 'path':
                color = 'yellow';
                break;
            case 'stack':
                color = 'grey';
                break;
            case 'c':
                color = '#00BFFF';
                break;
            case 'e':
                color = 'rgba(200,200,200)';
                break;
            case 'w':
                color = 'rgba(0,0,0,1)';
                break;
            case 's':
                color = 'green';
                break;
            case 'f':
                color = 'red';
                break;
            default:
                color = 'white'
                break;
        }

        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, width);
    }

    drawParentArrow = (width, ctx) => {
        if(this.parent) {
            ctx.beginPath();
            this.canvasArrow(ctx, width);
            ctx.stroke();
        }
    }

    canvasArrow = (ctx, width) => {
        const fromx = this.x * width + (width/2);
        const fromy = this.y * width + (width/2);
        const tox = this.parent.x * width + (width/2);
        const toy = this.parent.y * width + (width/2);

        var headlen = 10; // length of head in pixels
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);

        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    }
}
