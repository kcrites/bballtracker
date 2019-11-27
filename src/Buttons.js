//Table with buttons for stats

import React from 'react';
import './Buttons.css';
import Checkbox from './Checkbox';
import Button from 'react-bootstrap/Button';


class Buttons extends React.Component {
    constructor(props){
		super(props);
        this.state = {
            checked: false,
            teamScore: 0,
            opponentScore: 0,
            time: ''
        }
    };

componentWillMount(){
this.setState({time: ''});   
}

handleShot = (event) => {
   let name = event.target.name;
   let value = event.target.value;
   value = parseInt(value);
   //console.log(`Name: ${name} Value: ${value}`);
   this.props.addPoints(name, this.props.currentQuarter, value);
}
 
 handlePlay = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    value = parseInt(value);
   // console.log(`Name: ${name} Value: ${value}`);
    this.props.addPlay(name, this.props.currentQuarter, value);
 }

 handleCheckbox = (event) => {
     let tempCheck = !this.state.checked;
     this.setState({checked: tempCheck});
     this.props.checked(tempCheck);
 }

 handleTime = (event) => {
    const { subTime } = this.props;
    let value = event.target.value;

    this.setState({time: value});
 
    subTime(value, this.state.checked);
         
 }

 handleScore = (event) => {
     let value = event.target.value;
     let who = event.target.name;
     value = parseInt(value);
    // let forthQuarter = {...this.state.forthQuarter, [who]: score};
     this.setState({[who]: value});
   
 }

 handleNotes = (event) => {
     let notes = event.target.value;
     this.props.addNotes("notes", notes); 
 }

 handleEnd = (event) => {
     const { time, opponentScore, teamScore, checked } = this.state;
     let value = event.target.value;
     let inOrOut = '', tempTime = '';
     if(opponentScore === this.props.totals.opponentScore && teamScore === this.props.totals.teamScore){
        return window.alert('Please enter the score first');
     }
     if (value === 'eoq') {
        (checked) ? inOrOut = 'timeOut' : inOrOut = 'timeIn';
    if(time === '') {
            tempTime = '0:00';
        } else tempTime = time;
        let scoreArray = [teamScore,opponentScore, tempTime, inOrOut];
       
        this.props.gameScore(scoreArray);
        this.props.changeQuarter();
        
        this.setState({time: ''});
       
     }
 }

 

render() {
const { currentQuarter } = this.props;
const { checked, time } = this.state;
const { handleEnd, handlePlay, handleCheckbox, handleTime, handleShot, handleScore, handleNotes} = this;


        return (
            <div> 
                <div className='container_header_info zone'>
                    <label className="textbox">Quarter {currentQuarter}</label>
                    <div className="textbox">Started Quarter <Checkbox handleCheckbox={handleCheckbox} isSelected={this.state.checked}/></div>
                    <div>{(checked ? <label>Time out </label> : <label>Time in </label>)} <input name='time' type="text" className="timebox" value={time} onChange={handleTime} ></input></div>
                    <div>Notes: <input name='notes' onChange={handleNotes} type='text'/></div> 
                    <div>{this.props.info.team} <input className="inputbox" onChange={handleScore} name='teamScore' type='text'/></div><div>{this.props.info.opponent} <input onChange={this.handleScore} className="inputbox" name='opponentScore' type='text'/></div>
                </div>
                <br/>
                <div className='container_buttons'> 
                    <Button variant="success" name='fieldGoals' value='1' onClick={handleShot} className="font-weight-bold">Field Goal</Button>
                    <Button variant="warning" name='missedTwo' value='1' onClick={handlePlay}>Missed 2</Button>
                    <Button variant="success" name='threePointers' value='1' onClick={handleShot} className="font-weight-bold">3 Points</Button>
                    <Button variant="warning" name='missedThree' value='1' onClick={handlePlay}>Missed 3</Button>
                    <Button variant="success" name='freeThrows' value='1' onClick={handleShot} className="font-weight-bold">Free Throw</Button>
                    <Button variant="warning" name='missedFT' value='1' onClick={handlePlay}>Missed Free Throw</Button>
                    <Button variant="primary" name='assists' value="1" onClick={handlePlay}>Assist</Button>
                    <Button variant="primary" name='steals' value="1" onClick={handlePlay}>Steal</Button>
                    <Button variant="primary" name='blocks' value="1" onClick={handlePlay}>Block</Button>
                    <Button variant="primary" name='blockedPass' value="1" onClick={handlePlay}>Blocked Pass</Button>
                    <Button variant="primary" name='dRebounds' value="1" onClick={handlePlay}>Defensive Rebound</Button>
                    <Button variant="primary" name='oRebounds' value="1" onClick={handlePlay}>Offensive Rebound</Button>
                    <Button variant="danger" name='personalFouls' value="1" onClick={handlePlay}>Personal Foul</Button>
                    <Button variant="dark" name='End of Quarter' value='eoq' onClick={handleEnd}>End of Quarter</Button>
                </div>
            </div>
        );
    }
}

export default Buttons;