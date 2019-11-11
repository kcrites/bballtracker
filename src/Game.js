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
    gameDate: 'Dec 12, 2019',
    player: 'Hayden',
    team: 'Apollo',
    opponent: 'MCBA',
    venue: 'Away',
    qTime: '15:00',
    currentQuarter: 1,
    firstQuarter: {
      started: false,
      timeIn: '',
      timeOut: '',
      baskets: 0,
      assists: 0,
      blocks: 0,
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
        
        timeIn: '',
        timeOut: '',
        baskets: 0,
        assists: 0,
        blocks: 0,
        threePointers: 0,
        steals: 0,
        dRebound: 0,
        oRebound: 0,
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

addPoints = (type, q, value) => {
    

    if(q === 1) {
        let newValue = this.state.firstQuarter[type];
        console.log('newValue1 ' + newValue);
        newValue = newValue + value;
        console.log('newValue2 ' + newValue);
        let firstQuarter = {...this.state.firstQuarter, [type]: newValue};
    this.setState({firstQuarter});


    let newTotal = this.state.totals.baskets + value;
    let totals = {...this.state.totals, baskets: newTotal};
    this.setState({totals});

     //   this.setState({firstQuarter: {
      //      [type]: newValue
       // }})
    }
}

render() {
   // const { handleEnd, handlePlay, handleCheckbox, handleTime, handleShot} = this;
    const { team, opponent } = this.state;
  //  const { route } = this.props;
  
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
                    <Buttons addPoints={this.addPoints} currentQuarter={this.state.currentQuarter}/></Card.Body></Card></Col>

            </Row>
            <Row className="justify-content-md-center">
            <Col xs={4}>Totals
                <Table responsive striped bordered hover variant="dark" size="sm">
                    <tbody >
                        <tr>
                            <td>Points</td>
                            <td>{this.state.totals.baskets}</td>
                        </tr>
                        <tr>
                            <td>Rebounds</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>Assists</td>
                            <td>14</td>
                        </tr>
                        <tr>
                            <td>Free Throws</td>
                            <td>14</td>
                        </tr>
                        <tr>
                            <td>Personal Fouls</td>
                            <td>14</td>
                        </tr>
                    </tbody></Table></Col>
            </Row>
      </Container>
      </div>
    );
}
};

export default Game;


    