//Renders a screen to choose starting a game or going to list of previous games
import React from 'react';
//import logo from './bball.png';
//import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
 
 const Footer = (props) => {

   const manageProps = () => {
       const { type, home, back} = props.headerInfo;
        if(type === 'gamereport'){
            return (<>
            <p className="navbar-brand" onClick={this.handleHomeClick}><small>Home</small></p>
            <p className="navbar-brand" onClick={this.handleListClick}><small>Game List</small></p> </>)
        } else if (type === 'player'){
            return <><p className="navbar-brand" onClick={this.handleHomeClick}><small>Home</small></p></>
        } else if(type === 'quarter'){
            return  (<>
            <p className="navbar-brand" onClick={handleHomeClick}><small>Home</small></p>
            <p className="navbar-brand" onClick={props.handle2Click}><small>Back to the Game</small></p> </>)
        } else if(type === 'gamelist'){
            return title;
        }
    };

    return (
        <nav className="navbar navbar-dark bg-dark "> 
        <div className="container">
          <p className="navbar-brand" onClick={this.handleHomeClick}><small>{manageProps()}</small></p>
         </div>
    </nav>
    );
 }

 export default Footer;