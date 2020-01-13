//Renders a screen to choose starting a game or going to list of previous games
import React from 'react';
import logo from './bball.png';
//import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
 
 const Header = (props) => {

   const manageProps = () => {
       const { type, title, player, quarter } = props.headerInfo;
        if(type === 'gamereport'){
            return title;
        } else if (type === 'player'){
            return <>{title} -   <strong>{player}</strong></>
        } else if(type === 'quarter'){
            return 'Quarter ' + quarter + ' Report';
        } else if(type === 'gamelist'){
            return title;
        }
    };

    return (
        <div className="pos-f-t">
            <nav className="navbar navbar-dark bg-dark">
            <p className="navbar-brand" >
                <img src={logo}  width="30" height="30" className="d-inline-block align-top" alt="Bball Logo"/>
                &nbsp; {manageProps()}
            </p>
            </nav>
        </div>
    );
 }

 export default Header;