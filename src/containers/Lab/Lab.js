import React, { useState} from 'react';
import SideBar from '../../components/SideBar/SideBar';
import MazeCreator from '../../components/Mazes/MazeCreator/MazeCreator';
import MazeGenerator from '../../components/Mazes/MazeGenerator/MazeGenerator';
import classes from './Lab.module.scss';

export default function Lab(props) {
    
    const [project, setProject] = useState('mazeGenerator');
    const [cellSize, setCellSize] = useState(40);
    const [algorithm, setAlgorithm] = useState('dfs');

    const currentProject = project === 'mazeGenerator' ? <MazeGenerator algorithm={algorithm} cellWidth={cellSize} /> : <MazeCreator algorithm={algorithm} cellWidth={cellSize} />;
    
    console.log(cellSize);
    return (
        <div className={classes.lab}>
            <SideBar 
                cellWidth={cellSize}
                handleProjectChange={setProject} 
                handleCellSizeChange={setCellSize} 
                handleAlgorithmChange={setAlgorithm} />
            {currentProject}
        </div>
    )
}
