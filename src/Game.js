import React from 'react';
import Buttons from './Buttons';
//import GameInfo from './GameInfo';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import './Game.css';

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
      dRebound: 0,
      oRebound: 0,
      personalFouls: 0,
      freeThrows: 0,
      missedTwo: 0,
      missedThree: 0,
      missedFT: 0,
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
      dRebound: 0,
      oRebound: 0,
      personalFouls: 0,
      freeThrows: 0,
      missedTwo: 0,
      missedThree: 0,
      missedFT: 0,
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
      dRebound: 0,
      oRebound: 0,
      personalFouls: 0,
      freeThrows: 0,
      missedTwo: 0,
      missedThree: 0,
      missedFT: 0,
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
      dRebound: 0,
      oRebound: 0,
      personalFouls: 0,
      freeThrows: 0,
      missedTwo: 0,
      missedThree: 0,
      missedFT: 0,
    },
    totals: {
        
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
        const { team, gameDate, opponent, venue, qTime, player } = this.state;
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
        
       this.saveQuarterResults(current);
        tempQ++;
        this.setState({currentQuarter: tempQ});
    }

    saveQuarterResults = (current) => {
        //manage end of 4th
            const { started, timeIn, timeOut, baskets, assists, blocks, blockedPass, threePointers, steals, dRebound, oRebound, personalFouls,
                    freeThrows,missedTwo, missedThree, missedFT} = this.state[current];

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
                dRebound: dRebound,
                oRebound: oRebound,
                personalFouls: personalFouls,
                freeThrows: freeThrows,
                missedTwo: missedTwo,
                missedThree: missedThree,
                missedFT: missedFT,
            }
        console.table(gameTemp[current]);
    }
    
    addPlay = (type, q, value) => {
        let quarter;

        if(q === 1){
            quarter = 'firstQuarter';
            let newValue = this.state.firstQuarter[type];
          //  console.log('newValue1 ' + newValue);
            newValue = newValue + value;
          //  console.log('newValue2 ' + newValue);
            let firstQuarter = {...this.state.firstQuarter, [type]: newValue};
            this.setState({firstQuarter});

            this.savePoints(value, type, quarter);
        }
    }

    addPoints = (type, q, value) => {
        let quarter;

        if(q === 1) {
            quarter = 'firstQuarter';
            let newValue = this.state.firstQuarter[type];
            console.log('newValue1 ' + newValue);
            newValue = newValue + value;
            console.log('newValue2 ' + newValue);
            let firstQuarter = {...this.state.firstQuarter, [type]: newValue};
            this.setState({firstQuarter});

            this.savePoints(value, type, quarter);
        } else if(q === 2){
            quarter = 'secondQuarter';
            let newValue = this.state.secondQuarter[type];
            console.log('newValue1 ' + newValue);
            newValue = newValue + value;
            console.log('newValue2 ' + newValue);
            let secondQuarter = {...this.state.secondQuarter, [type]: newValue};
            this.setState({secondQuarter});

            this.savePoints(value, type, quarter);
        }
    }

    savePoints = (value, type, quarter) => {
        //one function to save to state for each quarter - called fom addPoints
        
        let newTotal = this.state.totals[type] + value;
        let totals = {...this.state.totals, [type]: newTotal};
        this.setState({totals});
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
                    <Buttons addPoints={this.addPoints} changeQuarter={this.changeQuarter}
                             currentQuarter={this.state.currentQuarter} addPlay={this.addPlay} /></Card.Body></Card></Col>

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


    