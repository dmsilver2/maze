import React, { Component } from 'react';
import classes from './mazegenerator.module.scss';
import dfsMazeGenerator from './DfsMazeGenerator';
import aStarSolver from './AStarSolver';
import bfsSolver from '../shared/BfsSolver';
import dfsSolver from '../shared/DfsSolver';
import dijkstraSolver from '../shared/DijkstraSolver';

export default class MazeGenerator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: true
        };

        this.canvasWidth = 800;
        this.canvasHeight = 480;
        this.canvasRef = React.createRef();
        this.maze = {};
        // The timer for solving maze
        this.myTimer = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.cellWidth !== this.props.cellWidth || nextState.active !== this.state.active;
    }

    componentDidMount() {
        this.generateNewMaze();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.cellWidth !== this.props.cellWidth) {
            this.setState({active: false});
            setTimeout(this.generateNewMaze, 10); 
        }
    }

    resetMaze = () => {
        if(this.myTimer) clearInterval(this.myTimer);
        this.maze.reset();
    }

    generateNewMaze = () => {
        if(this.myTimer) clearInterval(this.myTimer);

        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const cellWidth = this.props.cellWidth;
        const cols = Math.floor(this.canvasWidth / cellWidth);
        const rows = Math.floor(this.canvasHeight / cellWidth);

        const generator = dfsMazeGenerator(cols, rows, cellWidth, ctx);
        this.maze = generator.maze;
        const animate = generator.animate;
        const stack = generator.stack;

        this.setState({active: true});

        setTimeout(() => {
            (function loop() {
                if (this.state.active) {
                    animate();
                    this.maze.draw();
                    if (stack.length) {
                        requestAnimationFrame(loop.bind(this));
                    } else {
                        this.maze.getStartCell().state = 's';
                        this.maze.getFinishCell().state = 'f';
                        this.maze.draw();
                        this.setState({active: false});
                    }
                }
            }.bind(this))();
        }, 10);    
    }



    solveMaze = () => {
        if(this.myTimer) clearInterval(this.myTimer);

        let solverAlgorithm = null;
        switch (this.props.algorithm) {
            case 'dfs':
                solverAlgorithm = dfsSolver;
                break;
            case 'bfs':
                solverAlgorithm = bfsSolver;
                break;
            case 'astar':
                solverAlgorithm = aStarSolver;
                break;
            case 'dijkstra':
                solverAlgorithm = dijkstraSolver;
                break;
            default:
                solverAlgorithm = dfsSolver;
                break;
        }

        this.resetMaze();
        let animate = solverAlgorithm(this.maze).updateSearch;

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
        }, myInterval);
    }

    render() {
        return (
            <div className={classes.maze_container}>
                <canvas
                    ref={this.canvasRef}
                    className={classes.canvas}
                    width={this.canvasWidth + "px"}
                    height={this.canvasHeight + "px"}
                />
                <div className={classes.button_container}>
                    <button disabled={this.state.active} className={[classes.btn, classes.maze_button].join(' ')} onClick={this.solveMaze}>Solve Maze</button>
                    <button disabled={this.state.active} className={[classes.btn, classes.maze_button].join(' ')} onClick={this.resetMaze}>Reset Maze</button>
                    <button disabled={this.state.active} className={[classes.btn, classes.maze_button].join(' ')} onClick={this.generateNewMaze}>New Maze</button>
                </div>
            </div>

        )
    }
}