import React from 'react';
import Lab from './containers/Lab/Lab';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.mazeApp}>
      <Lab />
    </div>
  );
}

export default App;
