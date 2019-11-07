//Table with buttons for stats

import React from 'react';
import './Buttons.css';

class Dashboard extends React.Component {
    constructor(props){
		super(props);
        this.state = {}
        
    };

handleShot = (event) => {
   let name = event.target.name;
   let value = event.target.value;
   console.log(`Name: ${name} Value: ${value}`);
}
 
 handlePlay = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(`Name: ${name} Value: ${value}`);
 }

    render() {
        return (
            <div className='container_buttons'> 
               <button name='2 Points' value='2' onClick={this.handleShot}>2 Points</button>
               <button name='Missed 2 point' value='2' onClick={this.handleShot}>Missed 2</button>
               <button name='3 points' value='3' onClick={this.handleShot}>3 Points</button>
               <button name='Missed 3 point' value='3' onClick={this.handleShot}>Missed 3</button>
               <button name='Made Free Throw' value='1' onClick={this.handleShot}>Free Throw</button>
               <button name='Missed Free Throw' value='1' onClick={this.handleShot}>Missed Free Throw</button>
               <button name='Assist' value="1" onClick={this.handlePlay}>Assist</button>
               <button name='Steal' value="1" onClick={this.handlePlay}>Steal</button>
               <button name='Block' value="1" onClick={this.handlePlay}>Block</button>
               <button name='D Rebound' value="1" onClick={this.handlePlay}>Defensive Rebound</button>
               <button name='O Rebound' value="1" onClick={this.handlePlay}>Offensive Rebound</button>
               <button name='PF' value="1" onClick={this.handlePlay}>Personal Foul</button>
            </div>
        );
    }
}

export default Dashboard;