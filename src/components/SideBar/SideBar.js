import React from 'react'
import classes from './SideBar.module.scss'

export default function SideBar(props) {
    return (
        <div className={classes.lab_sidebar}>
            <label className={classes.select_label}> Choose Project
                <select className={classes.select} onChange={e => props.handleProjectChange(e.target.value)}>
                    <option value="mazeGenerator">Maze Generator</option>
                    <option value="mazeCreator">Maze Createor</option>
                </select>
            </label>
            <label className={classes.select_label}> Choose Alogorithm
                <select className={classes.select} onChange={e => props.handleAlgorithmChange(e.target.value)}>
                    <option value="dfs">Depth First Search</option>
                    <option value="bfs">Breadth First Search</option>
                    <option value="dijkstra">Dijkstra Shortest Path</option>
                    <option value="astar">A* Pathfinder</option>
                </select>
            </label>
            <label className={classes.select_label}> Choose Cell Size
                <select className={classes.select} value={props.cellWidth} onChange={e => props.handleCellSizeChange(+e.target.value)}>
                    <option value="20">Small</option>
                    <option value="40">Regular</option>
                    <option value="80">Large</option>
                </select>
            </label>
        </div>
    );
}

