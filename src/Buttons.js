//Table with buttons for stats

import React from 'react';
import './Buttons.css';
import Button from 'react-bootstrap/Button';


class Buttons extends React.Component {
    constructor(props){
		super(props);
        this.state = {
            started: false,
            checked: false,
            teamScore: 0,
            opponentScore: 0
        }
    };

componentWillMount(){
   
}
handleShot = (event) => {
   let name = event.target.name;
   let value = event.target.value;
   value = parseInt(value);
   console.log(`Name: ${name} Value: ${value}`);
   this.props.addPoints(name, this.props.currentQuarter, value);
}
 
 handlePlay = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    value = parseInt(value);
    console.log(`Name: ${name} Value: ${value}`);
    this.props.addPlay(name, this.props.currentQuarter, value);
 }

 handleCheckbox = (event) => {
     console.log(`started: ${event.target.value}`);
     if(event.target.checked) {
         this.setState({started: true, checked: true});
     } else {
         this.setState({started: false, checked: false});
     }
 }

 handleTime = (event) => {
    const { subTime } = this.props;
    let value = event.target.value;

     if (event.target.name === 'timein') {
         subTime(value, this.state.started);
     }
         else {
            subTime(value, this.state.started);
         }
 }

 handleScore = (event) => {
     let value = event.target.value;
     let who = event.target.name;
     
    // let forthQuarter = {...this.state.forthQuarter, [who]: score};
     this.setState({[who]: value});
   
 }
 handleNotes = (event) => {
     let notes = event.target.value;
     this.props.saveNotes(notes); //FINISH THIS
 }

 handleEnd = (event) => {
     let value = event.target.value;
     if (value === 'eoq') {
        //run END OF QUARTER FUNCTION to get score and save to DB
        //run a function to save quarter to DB
        //set quarter to next
        let scoreArray = [this.state.teamScore,this.state.opponentScore]
        this.props.gameScore(scoreArray);
        this.props.changeQuarter();
        if(this.state.checked) {
            this.setState({started: true})
        } else {
            this.setState({started: false})
        }
     }
 }

 

render() {
//const { currentQ } = this.props.currentQuarter; NOT WORKING??
const { handleEnd, handlePlay, handleCheckbox, handleTime, handleShot} = this;

        return (
            <div> 
                <div className='container_header_info zone'>
                    <label className="textbox">Quarter {this.props.currentQuarter}</label>
                    <div className="textbox">Started Quarter <input type="checkbox" name="Started" onChange={handleCheckbox} value='Yes'/></div>
                    <div>{(this.state.started ? <label>Time out </label> : <label>Time in </label>)} <input name='time' className="timebox" onChange={handleTime} defaultValue='0:00'></input></div>
                    <div>Notes: <input name='notes' type='text'/></div> 
                    <div>{this.props.info.team} <input className="inputbox" onChange={this.handleScore} name='teamScore' type='text'/></div><div>{this.props.info.opponent} <input onChange={this.handleScore} className="inputbox" name='opponentScore' type='text'/></div>
                </div>
                <br/>
                <div className='container_buttons'> 
                    <Button variant="success" name='baskets' value='2' onClick={handleShot} className="font-weight-bold">2 Points</Button>
                    <Button variant="warning" name='missedTwo' value='1' onClick={handlePlay}>Missed 2</Button>
                    <Button variant="success" name='threePointers' value='3' onClick={handleShot} className="font-weight-bold">3 Points</Button>
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