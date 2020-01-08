//Renders a screen to choose starting a game or going to list of previous games
import React from 'react';
import logo from './bball.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
 const Welcome = (props) => {

    const handleGameClick = (event) => {
        props.onRouteChange(event.target.value);
          };

    return (
 <header className="App-header">
                <img src={logo} className="Bball-logo" alt="logo" /><br></br>
                <button onClick={handleGameClick} value="gameinfo">
                  Record a New Game
                </button>
                <br/>
                <button onClick={handleGameClick} value="gamelist">List of Previous Games</button>
                <br/>
                <button onClick={handleGameClick} value="player">Player Stats Report</button>

                <p className='font-weight-light mt-3' style={{fontSize: '.75rem'}}>Version 1.1</p>
            </header>
    );
 }


 export default Welcome;