
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
                  Record a new game
                </button>
                <br/>
                <button onClick={handleGameClick} value="report">Look at Games</button>
              
            </header>
    );
 }


 export default Welcome;