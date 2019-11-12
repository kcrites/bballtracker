import React from 'react';
import Buttons from './Buttons';
//import GameInfo from './GameInfo';
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
        qTime: ''
    },
    currentQuarter: 1,
    firstQuarter: {
      started: false,
      timeIn: '',
      timeOut: '',
      baskets: 0,
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
    },
    secondQuarter: {
      started: false,
      timeIn: '',
      timeOut: '',
      baskets: 0,
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
    },
    thirdQuarter: {
      started: false,
      timeIn: '',
      timeOut: '',
      baskets: 0,
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
    },
    forthQuarter: {
      started: false,
      timeIn: '',
      timeOut: '',
      baskets: 0,
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
    },
    totals: {
        teamScore: 0,
        opponentScore: 0,
        minutesPlayed: '',
        points: 0,
        baskets: 0,
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

  const gameTemp = gameObject;

class Game extends React.Component {
    constructor(props){
		super(props);
        this.state = gameObject;
        
    };

    componentWillMount(){
        const { gameInfo } = this.props;
        let info = {...this.state, 
            team: gameInfo[0],
            player: gameInfo[1],
            opponent: gameInfo[2],
            gameDate: gameInfo[3],
            venue: gameInfo[4],
            qTime: gameInfo[5]
        };
        this.setState({info});

        
    }

    changeQuarter = () => {
        let tempQ = this.state.currentQuarter;
        let current='';
        if(tempQ === 1){
            current = 'firstQuarter';
        } else if( tempQ === 2){
            current = 'secondQuarter';
        }
            else if(tempQ === 3){
                current = 'thirdQuarter';
            } else if(tempQ === 4){
                current = 'forthQuarter';
            }
        
        tempQ++;
        this.setState({currentQuarter: tempQ});
        console.log(`teamscore: ${this.state.firstQuarter.teamScore} opponentScore ${this.state.firstQuarter.opponentScore}`)
        this.saveQuarterResults(current);
    }

    saveQuarterResults = (current) => {
        //manage end of 4th
            const { started, timeIn, timeOut, baskets, assists, blocks, blockedPass, threePointers, steals, dRebounds, oRebounds, personalFouls,
                    freeThrows,missedTwo, missedThree, missedFT } = this.state[current];
                //SEND TO DB
            gameTemp[current] = {
                started: started,
                timeIn: timeIn,
                timeOut: timeOut,
                baskets: baskets,
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
            }
        console.table(gameTemp[current]);
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

    subTime = (value, started) => {
        let q = this.state.currentQuarter;
        let x = '';
        if(started){x = 'timeOut'} else {x = 'timeIn'};
        if(q === 1) {
            let firstQuarter = {...this.state.firstQuarter, [x]: value, started: started};
            this.setState({firstQuarter});
        } else if(q === 2){
            let secondQuarter = {...this.state.secondQuarter, [x]: value};
            this.setState({secondQuarter});
        }
        else if(q === 3){
            let thirdQuarter= {...this.state.thirdQuarter, [x]: value};
            this.setState({thirdQuarter});
        }
        else if(q === 4){
            let forthQuarter = {...this.state.forthQuarter, [x]: value};
            this.setState({forthQuarter});
        }     
    }
    
    gameScore = (array) => {
        let teamScore = array[0];
        let opponentScore = array[1];
        let q = this.state.currentQuarter;
        scoreArray = array;
        teamScore= parseInt(teamScore);
        opponentScore = parseInt(opponentScore);
        if(q === 1) {
            let firstQuarter = {...this.state.firstQuarter, teamScore: teamScore, opponentScore: opponentScore};
            this.setState({firstQuarter});
        } else if(q === 2){
            let secondQuarter = {...this.state.secondQuarter, teamScore: teamScore, opponentScore: opponentScore};
            this.setState({secondQuarter});
        }
        else if(q === 3){
            let thirdQuarter= {...this.state.thirdQuarter, teamScore: teamScore, opponentScore: opponentScore};
            this.setState({thirdQuarter});
        }
        else if(q === 4){
            let forthQuarter = {...this.state.forthQuarter, teamScore: teamScore, opponentScore: opponentScore};
            this.setState({forthQuarter});
        }
    }

    //Calculates totals for sidebar
    totalsCalc = (type) => {
        const { baskets, freeThrows, threePointers } = this.state.totals;

        let totalRebounds = this.state.totals.oRebounds + this.state.totals.dRebounds;
        let totalPoints = baskets + freeThrows + threePointers;

        if(type === 'points'){
            return totalPoints;}
        else {
            return totalRebounds;
        }
    }

    gameStats = () => {
        
        let attempts = this.state.totals.missedTwo + this.state.totals.missedThree + (this.state.totals.threePointers/3) + (this.state.totals.baskets/2);
        console.log(`Final Stats: ${attempts} attempts`)
    }

render() {
   // const { handleEnd, handlePlay, handleCheckbox, handleTime, handleShot} = this;
    const { team, opponent } = this.state.info;
    const { personalFouls, assists, freeThrows } = this.state.totals;
    let tr = this.totalsCalc('rebounds');
    let tp = this.totalsCalc('points');
  
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
                             subTime={this.subTime} /></Card.Body></Card></Col>

            </Row>
            <Row className="justify-content-md-center">
            <Col xs={5}>Totals
                <Table responsive striped bordered hover variant="dark" size="sm">
                    <tbody >
                        <tr>
                            <td>Points</td>
                            <td>{tp}</td>
                        </tr>
                        <tr>
                            <td>Rebounds</td>
                            <td>{tr}</td>
                        </tr>
                        <tr>
                            <td>Assists</td>
                            <td>{assists}</td>
                        </tr>
                        <tr>
                            <td>Free Throws</td>
                            <td>{freeThrows}</td>
                        </tr>
                        <tr>
                            <td>Personal Fouls</td>
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


    