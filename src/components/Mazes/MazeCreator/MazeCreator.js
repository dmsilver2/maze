import React, { Component } from 'react';
import classes from './mazecreator.module.scss';
import aStarSolver from './AStarSolver';
import bfsSolver from '../shared/BfsSolver';
import dfsSolver from '../shared/DfsSolver';
import dijkstraSolver from '../shared/DijkstraSolver';
import Maze from './Maze';

export default class MazeCreator extends Component {
    constructor(props) {
        super(props)

        this.canvasWidth = 800;
        this.canvasHeight = 480;
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        canvas.onmousedown = this.mouseDown;
        canvas.onmouseup = this.mouseUp;
        this.generateNewMaze();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.cellWidth !== this.props.cellWidth;
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.myTimer) clearInterval(this.myTimer);
        this.generateNewMaze();
    }

    clearMaze = () => {
        if(this.myTimer) clearInterval(this.myTimer);
        this.maze.clearMaze();
    }

    resetMaze = () => {
        if(this.myTimer) clearInterval(this.myTimer);
        this.maze.reset();
    }

    generateNewMaze = () => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const cellWidth = this.props.cellWidth;
        const cols = Math.floor(this.canvasWidth / cellWidth);
        const rows = Math.floor(this.canvasHeight / cellWidth);
        this.maze = new Maze(cols, rows, cellWidth, ctx);

        this.maze.draw();
    }
    
    solveMaze = () => {
        this.resetMaze();
        if(this.myTimer) clearInterval(this.myTimer);

        let solverAlgorithm = null;
        switch (this.props.algorithm) {
            case 'dfs':
                solverAlgorithm = dfsSolver;
                break;
            case 'bfs':
                solverAlgorithm = bfsSolver;
                break;
            case 'dijkstra':
                solverAlgorithm = dijkstraSolver;
                break;
            case 'astar':
                solverAlgorithm = aStarSolver;
                break;
            default:
                solverAlgorithm = dfsSolver;
                break;
        }

        let solver = solverAlgorithm(this.maze);
        let searchList = solver.list;
        let animate = solver.updateSearch;
        let myInterval = 200;

        switch (this.props.cellWidth) {
            case 20:
                myInterval = 100;
                break;
            case 40:
                myInterval = 200;
                break;
            case 80:
                myInterval = 300;
                break;
            default:
                break;
        }

        this.myTimer = setInterval(() => {
            let found = animate();
            this.maze.draw();
            if(found)
                clearInterval(this.myTimer);
            if(!found && searchList.length === 0) {
                clearInterval(this.myTimer)
                alert('Maze Cannot be solved')
            }
        }, myInterval);
    }

    mouseDown = (e) => {
        const canvas = this.canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        canvas.onmousemove = this.myMove;
        const cellWidth = this.props.cellWidth;
        const cols = Math.floor(this.canvasWidth / cellWidth);
        const rows = Math.floor(this.canvasHeight / cellWidth);

        let x = Math.floor((e.clientX - rect.left) / cellWidth);
        if (x < 0) 
            x = 0;
        if (x >= cols)
            x = cols - 1;

        let y = Math.floor((e.clientY - rect.top) / cellWidth);
        if (y >= rows)
            y = rows - 1;
        if (y < 0)
            y = 0;

        this.boundX = x;
        this.boundY = y;
        this.maze.handleCellClick(x,y);
    }

    mouseUp = () => {
        this.canvasRef.current.onmousemove = null;
    }

    myMove = e => {
        const canvas = this.canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const cellWidth = this.props.cellWidth;
        const cols = Math.floor(this.props.width / cellWidth);
        const rows = Math.floor(this.props.height / cellWidth);

        let x = Math.floor((e.clientX - rect.left) / cellWidth);
        if (x < 0) 
            x = 0;
        if (x >= cols)
            x = cols - 1;

        let y = Math.floor((e.clientY - rect.top) / cellWidth);
        if (y >= rows)
            y = rows - 1;
        if (y < 0)
            y = 0;

        if (this.boundX !== x || this.boundY !== y) {
            this.maze.handleCellClick(x,y);
            this.boundX = x;
            this.boundY = y;
        }
    }
    
    render() {
        return (
            <div className={classes.maze_container}>
                <p>Click or Click and drag to draw the maze</p>
                <canvas
                    ref={this.canvasRef}
                    className={classes.canvas}
                    width={this.canvasWidth + "px"}
                    height={this.canvasHeight + "px"}
                />
                <div className={classes.button_container}>
                    <button 
                        className={[classes.btn, classes.maze_button].join(' ')} 
                        onClick={this.solveMaze}>Solve Maze</button>
                    <button 
                        className={[classes.btn, classes.maze_button].join(' ')} 
                        onClick={this.resetMaze}>Reset Maze</button>
                    <button 
                        className={[classes.btn, classes.maze_button].join(' ')} 
                        onClick={this.clearMaze}>Clear Maze</button>
                </div>
            </div>
            
        )
    }
}
