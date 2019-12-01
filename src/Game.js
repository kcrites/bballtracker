import React from 'react';
import Buttons from './Buttons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import './Game.css';

let scoreArray = [];
const gameObject = {
    info: {
        gameDate: '',
        player: '',
        team: '',
        opponent: '',
        venue: '',
        qTime: '',
        gameId: 0,
    },
    currentQuarter: 1,
    firstQuarter: {
      started: false,
      timeIn: '',
      timeOut: '',
      fieldGoals: 0,
      assists: 0,
      blocks: 0,
      blockedPass: 0,
      threePointers: 0,
      steals: 0,
      dRebounds: 0,
      oRebounds: 0,
      personalFouls: 0,
      freeThrows: 0,
      missedTwo: 0,
      missedThree: 0,
      missedFT: 0,
      teamScore: 0,
      opponentScore: 0,
      notes: '',
    },
    secondQuarter: {
      started: false,
      timeIn: '',
      timeOut: '',
      fieldGoals: 0,
      assists: 0,
      blocks: 0,
      blockedPass: 0,
      threePointers: 0,
      steals: 0,
      dRebounds: 0,
      oRebounds: 0,
      personalFouls: 0,
      freeThrows: 0,
      missedTwo: 0,
      missedThree: 0,
      missedFT: 0,
      teamScore: 0,
      opponentScore: 0,
      notes: '',
    },
    thirdQuarter: {
      started: false,
      timeIn: '',
      timeOut: '',
      fieldGoals: 0,
      assists: 0,
      blocks: 0,
      blockedPass: 0,
      threePointers: 0,
      steals: 0,
      dRebounds: 0,
      oRebounds: 0,
      personalFouls: 0,
      freeThrows: 0,
      missedTwo: 0,
      missedThree: 0,
      missedFT: 0,
      teamScore: 0,
      opponentScore: 0,
      notes: '',
    },
    forthQuarter: {
      started: false,
      timeIn: '',
      timeOut: '',
      fieldGoals: 0,
      assists: 0,
      blocks: 0,
      blockedPass: 0,
      threePointers: 0,
      steals: 0,
      dRebounds: 0,
      oRebounds: 0,
      personalFouls: 0,
      freeThrows: 0,
      missedTwo: 0,
      missedThree: 0,
      missedFT: 0,
      teamScore: 0,
      opponentScore: 0,
      notes: '',
    },
    totals: {
        teamScore: 0,
        opponentScore: 0,
        minutesPlayed: '',
        points: 0,
        fieldGoals: 0,
        assists: 0,
        blocks: 0,
        blockedPass: 0,
        threePointers: 0,
        steals: 0,
        dRebounds: 0,
        oRebounds: 0,
        personalFouls: 0,
        freeThrows: 0,
        missedTwo: 0,
        missedThree: 0,
        missedFT: 0,
    }
  }

class Game extends React.Component {
    constructor(props){
		super(props);
        this.state = gameObject;
        
    };

    componentWillMount(){

    }

    componentDidMount() {
        //check to see if there is localStorage = 'bball'
        const { gameInfo } = this.props;
       
        let info = {...this.state.info, 
            team: gameInfo[0],
            player: gameInfo[1],
            opponent: gameInfo[2],
            gameDate: gameInfo[3],
            venue: gameInfo[4],
            qTime: gameInfo[5],
            gameId: gameInfo[6],
        };
        this.setState({info});
      //  console.table(info, gameInfo); 
    }


    changeQuarter = () => {
        let tempQ = this.state.currentQuarter;
        let current='';
        
        current = this.findQuarterName(tempQ);
 
            let tp = this.totalsCalc('points', 'totals');
            let totals = {...this.state.totals, points: tp} 
        if(tempQ <= 3) {
            tempQ++;
           // let tp = this.totalsCalc('points', 'totals');
           // let totals = {...this.state.totals, points: tp} 
            this.setState({currentQuarter: tempQ, totals});
            this.saveQuarterResults(current);
        } else {
            this.setState({currentQuarter: 0, totals});
            this.saveQuarterResults(current);
            this.endGame();
        }
        
    }

    saveQuarterResults = (current) => {
        //manage end of 4th
            const { started, timeIn, timeOut, fieldGoals, assists, blocks, blockedPass, threePointers, steals, dRebounds, oRebounds, personalFouls,
                    freeThrows,missedTwo, missedThree, missedFT, notes } = this.state[current];
            const { currentQuarter } = this.state;
            
            let info = {...this.state.info, gameId: this.props.gameInfo[6]};
            this.setState({info});
         // console.log(`gameid: ${this.props.gameInfo[6]}`)
                fetch('http://localhost:3005/savequarter', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        gameid: this.props.gameInfo[6],
                        quarter: currentQuarter,
                        started: started,
                        timeIn: timeIn,
                        timeOut: timeOut,
                        fieldGoals: fieldGoals,
                        assists: assists,
                        blocks: blocks,
                        blockedPass: blockedPass,
                        threePointers: threePointers,
                        steals: steals,
                        dRebounds: dRebounds,
                        oRebounds: oRebounds,
                        personalFouls: personalFouls,
                        freeThrows: freeThrows,
                        missedTwo: missedTwo,
                        missedThree: missedThree,
                        missedFT: missedFT,
                        teamScore: parseInt(scoreArray[0]),
                        opponentScore: parseInt(scoreArray[1]),
                        notes: notes
                    })
                })
                .then(response => response.json())
                .then(results => {
                    if(results.id){
                       
                        console.log(results);
                    }
                }).catch(err => {console.log(err)});



       // console.table(gameTemp[current]);
        let data = JSON.stringify(this.state);
        localStorage.setItem('bball', data);
      // let test = localStorage.getItem('bball');
       // let nums = JSON.parse(test);
       // console.table(nums); */
       
    }

    sendTotals = () => {
        const { fieldGoals, assists, blocks, blockedPass, threePointers, steals, dRebounds, oRebounds, personalFouls,
            freeThrows,missedTwo, missedThree, missedFT, teamScore, opponentScore, points, minutesPlayed } = this.state.totals;
        const { gameId } = this.state.info;
        fetch('http://localhost:3005/savetotals', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                game: gameId,
                teamScore: teamScore,
                opponentScore: opponentScore,
                minutesPlayed: minutesPlayed,
                points: points,
                fieldGoals: fieldGoals,
                assists: assists,
                blocks: blocks,
                blockedPass: blockedPass,
                threePointers: threePointers,
                steals: steals,
                dRebounds: dRebounds,
                oRebounds: oRebounds,
                personalFouls: personalFouls,
                freeThrows: freeThrows,
                missedTwo: missedTwo,
                missedThree: missedThree,
                missedFT: missedFT,
            })
        })
        .then(response => response.json())
        .then(results => {
            if(results.id){
               
                console.log(results);
            }
        }).catch(err => {console.log(err)});
    }

    endGame =() => {
        //called at the end of 4th q. cleans up localStorage and finalizes stats
        localStorage.removeItem('bball');
       // console.log('endgame');
        this.sendTotals();
        this.props.onRouteChange("home");
    }
    
    addPlay = (type, q, value) => {
        let quarter;

        if(q === 1){
            quarter = 'firstQuarter';
            let newValue = this.state.firstQuarter[type];
            newValue = newValue + value;
            let firstQuarter = {...this.state.firstQuarter, [type]: newValue};
            this.setState({firstQuarter});

            this.savePoints(value, type, quarter);
        }
        if(q === 2){
            quarter = 'secondQuarter';
            let newValue = this.state.secondQuarter[type];
            newValue = newValue + value;
            let secondQuarter = {...this.state.secondQuarter, [type]: newValue};
            this.setState({secondQuarter});

            this.savePoints(value, type, quarter);
        }
        if(q === 3){
            quarter = 'thirdQuarter';
            let newValue = this.state.thirdQuarter[type];
            newValue = newValue + value;
            let thirdQuarter = {...this.state.thirdQuarter, [type]: newValue};
            this.setState({thirdQuarter});

            this.savePoints(value, type, quarter);
        }
        if(q === 4){
            quarter = 'forthQuarter';
            let newValue = this.state.forthQuarter[type];
            newValue = newValue + value;
            let forthQuarter = {...this.state.forthQuarter, [type]: newValue};
            this.setState({forthQuarter});

            this.savePoints(value, type, quarter);
        }
    }

    gameTime = (time, inOrOut) => {
        const { qTime } = this.state.info;
        let tempArray = time.split(":");
        let min = parseInt(tempArray[0]);
        let sec = parseInt(tempArray[1]);
        let timeArray = [];
        
        if(time === '0:00'){
            tempArray[0] = 10;
            tempArray[1] = 0;
            return tempArray;
        }

        if(inOrOut === 'timeIn') {
            // Difference between qTime and timeIn (i.e. 10:00, 3:52 = 6:08) 2:00
            timeArray[0] = qTime - min;// 7  8
            timeArray[1]= 60 - sec; //08  60
            if (timeArray[1] > 0) timeArray[0]-- ; //6  7
            if (timeArray[1] === 60) timeArray[1] = 0;
            return timeArray;
            
        } else if (inOrOut === 'timeOut') {
            timeArray[0] = min;
            timeArray[1] = sec;
            return timeArray;
        }

    }

   findQuarterName = (q) => {
       let quarter='';
    if(q === 1) {
        quarter = 'firstQuarter';
    } else  if(q === 2) {
        quarter = 'secondQuarter';
    } else  if(q === 3) {
        quarter = 'thirdQuarter';
    } else  if(q === 4) {
        quarter = 'forthQuarter';
    }
    return quarter;
   }
   
    addPoints = (type, q, value) => {
        let quarter;

        if(q === 1) {
            quarter = 'firstQuarter';
            let newValue = this.state.firstQuarter[type];
           
            newValue = newValue + value;
            
            let firstQuarter = {...this.state.firstQuarter, [type]: newValue};
            this.setState({firstQuarter});

            this.savePoints(value, type, quarter);
        } else if(q === 2){
            quarter = 'secondQuarter';
            let newValue = this.state.secondQuarter[type];
           
            newValue = newValue + value;
           
            let secondQuarter = {...this.state.secondQuarter, [type]: newValue};
            this.setState({secondQuarter});

            this.savePoints(value, type, quarter);
        }
        else if(q === 3){
            quarter = 'thirdQuarter';
            let newValue = this.state.thirdQuarter[type];
           
            newValue = newValue + value;
           
            let thirdQuarter = {...this.state.thirdQuarter, [type]: newValue};
            this.setState({thirdQuarter});

            this.savePoints(value, type, quarter);
        }
        else if(q === 4){
            quarter = 'forthQuarter';
            let newValue = this.state.forthQuarter[type];
           
            newValue = newValue + value;
           
            let forthQuarter = {...this.state.forthQuarter, [type]: newValue};
            this.setState({forthQuarter});

            this.savePoints(value, type, quarter);
        }
    }

    savePoints = (value, type, quarter) => {
        //one function to save to state for each quarter - called fom addPoints
        
        let newTotal = this.state.totals[type] + value;
        let totals = {...this.state.totals, [type]: newTotal};
        this.setState({totals});
    }

    addNotes = (type, value) => {
        let q = this.state.currentQuarter;
        if(q === 1) {
            let firstQuarter = {...this.state.firstQuarter, [type]: value};
            this.setState({firstQuarter});
        } else if(q === 2){
            let secondQuarter = {...this.state.secondQuarter, [type]: value};
            this.setState({secondQuarter});
        }
        else if(q === 3){
            let thirdQuarter = {...this.state.thirdQuarter, [type]: value};
            this.setState({thirdQuarter});
        }
        else if(q === 4){
            let forthQuarter = {...this.state.forthQuarter, [type]: value};
            this.setState({forthQuarter});
        }
    }

    checked = (checked) => {
        this.subTime('0', checked)
    }

    //Records time in or out of a quarter, and started status (Bool)
    //Called from checked() and Buttons/handleTime()
    subTime = (value, started) => {
        let q = this.state.currentQuarter;
        let x = '';
      //  console.log(`subtime started: ${started}, ${q}`)
        if(started)
            { x = 'timeOut';} else {x = 'timeIn'};
        if(q === 1) {
            let firstQuarter = {...this.state.firstQuarter, [x]: value, started: started};
            this.setState({firstQuarter});
        } else if(q === 2){
            let secondQuarter = {...this.state.secondQuarter, [x]: value, started: started};
         //   console.log(`second quarter: ${started}, ${value}, ${x}`)
            this.setState({secondQuarter});
        }
        else if(q === 3){
            let thirdQuarter= {...this.state.thirdQuarter, [x]: value, started: started};
            this.setState({thirdQuarter});
        }
        else if(q === 4){
            let forthQuarter = {...this.state.forthQuarter, [x]: value, started: started};
            this.setState({forthQuarter});
        }     
    }
    
    gameScore = (array) => {
        //Called from Buttons, saves game scores, time, and started bool to state
        let teamScore = array[0];
        let opponentScore = array[1];
        let time = array[2];
        let inOrOut = array[3];
        let other = '';
        let q = this.state.currentQuarter;
        scoreArray = array;
        teamScore= parseInt(teamScore);
        opponentScore = parseInt(opponentScore);

        if(inOrOut === 'timeIn'){
            other = "timeOut";
        } else other = "timeIn";

        if(q === 1) {
            let firstQuarter = {...this.state.firstQuarter, teamScore: teamScore, opponentScore: opponentScore, [inOrOut]: time, [other]: '0:00'};
            let totals = {...this.state.totals, teamScore: teamScore, opponentScore: opponentScore};
            this.setState({firstQuarter, totals});
        } else if(q === 2){
            let secondQuarter = {...this.state.secondQuarter, teamScore: teamScore, opponentScore: opponentScore, [inOrOut]: time, [other]: '0:00'};
            let totals = {...this.state.totals, teamScore: teamScore, opponentScore: opponentScore};
            this.setState({secondQuarter, totals});
        }
        else if(q === 3){
            let thirdQuarter= {...this.state.thirdQuarter, teamScore: teamScore, opponentScore: opponentScore, [inOrOut]: time, [other]: '0:00'};
            let totals = {...this.state.totals, teamScore: teamScore, opponentScore: opponentScore};
            this.setState({thirdQuarter, totals});
        }
        else if(q === 4){
            let forthQuarter = {...this.state.forthQuarter, teamScore: teamScore, opponentScore: opponentScore, [inOrOut]: time, [other]: '0:00'};
            let totals = {...this.state.totals, teamScore: teamScore, opponentScore: opponentScore};
            this.setState({forthQuarter, totals});
        }
    }

    //Calculates totals for sidebar
    totalsCalc = (type, period) => {
        const { fieldGoals, freeThrows, threePointers, oRebounds, dRebounds, personalFouls, assists } = this.state[period];

        let totalRebounds = oRebounds + dRebounds;
        let totalPoints = (fieldGoals * 2) + freeThrows + (threePointers * 3);
        let totalFT = freeThrows;
        let totalPF = personalFouls;
        let totalAssists = assists;

        if(type === 'points'){
            return totalPoints;}
        else if(type === 'rebounds') {
            return totalRebounds;
        } else if(type === 'freethrows') {
            return totalFT;
        } else if(type === 'personalfouls'){
            return totalPF;
        } else if(type === 'assists') {
            return totalAssists;
        }
    }

    gameStats = () => {
        
        let attempts = this.state.totals.missedTwo + this.state.totals.missedThree + (this.state.totals.threePointers/3) + (this.state.totals.fieldGoals/2);
        let finalArray = [];
       // console.table(finalArray);
        
       // console.log(`Final Stats: ${attempts} attempts`)
    }

render() {
   // const { handleEnd, handlePlay, handleCheckbox, handleTime, handleShot} = this;
   let cq = '';
   //console.log(this.props.gameInfo[6]);
   const { currentQuarter } = this.state;
    const { team, opponent } = this.state.info;
    const { personalFouls, assists, freeThrows } = this.state.totals;
    if(currentQuarter === 5) {
        cq = "forthQuarter"
    } else (cq = this.findQuarterName(currentQuarter));

    let tr = this.totalsCalc('rebounds', 'totals');
    let qr = this.totalsCalc('rebounds', cq);
    let tp = this.totalsCalc('points', 'totals');
    let qp = this.totalsCalc('points', cq);
    let qa = this.totalsCalc('assists', cq);
    let qft = this.totalsCalc('freethrows', cq);
    let qpf = this.totalsCalc('personalfouls', cq);
    
  
    return (
      <div className="App App-home">
        <Container >
            <Row>
                <Col med="true">{team} vs {opponent}</Col>
            </Row>
            <Row>
                <Col >
                    <Card className='App-body'>
                    <Card.Body>
                    <Buttons addPoints={this.addPoints} changeQuarter={this.changeQuarter} info={this.state.info}
                             currentQuarter={this.state.currentQuarter} addPlay={this.addPlay} gameScore={this.gameScore}
                             subTime={this.subTime} totals={this.state.totals} addNotes={this.addNotes} checked={this.checked} /></Card.Body></Card></Col>

            </Row>
            <Row className="justify-content-md-center">
            <Col lg={7}>Totals
                <Table responsive striped bordered hover variant="dark" size="sm">
                    <tbody className="text-left">
                        <tr>
                            <td>Points</td>
                            <td>Quarter</td>
                            <td>{qp}</td>
                            <td>Total</td>
                            <td>{tp}</td>
                        </tr>
                        <tr>
                            <td>Rebounds</td>
                            <td>Quarter</td>
                            <td>{qr}</td>
                            <td>Total</td>
                            <td>{tr}</td>
                        </tr>
                        <tr>
                            <td>Assists</td>
                            <td>Quarter</td>
                            <td>{qa}</td>
                            <td>Total</td>
                            <td>{assists}</td>
                        </tr>
                        <tr>
                            <td>Free Throws</td>
                            <td>Quarter</td>
                            <td>{qft}</td>
                            <td>Total</td>
                            <td>{freeThrows}</td>
                        </tr>
                        <tr>
                            <td>Personal Fouls</td>
                            <td>Quarter</td>
                            <td>{qpf}</td>
                            <td>Total</td>
                            <td>{personalFouls}</td>
                        </tr>
                    </tbody></Table></Col>
            </Row>

      </Container>
      </div>
    );
}
};

export default Game;


    