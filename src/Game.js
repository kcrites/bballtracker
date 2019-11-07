import React from 'react';
import Buttons from './Buttons';
import GameInfo from './GameInfo';
import './Game.css';

const gameObject = {
    gameDate: 'Dec 12, 2019',
    player: 'Hayden',
    team: 'Apollo',
    opponent: 'MCBA',
    venue: 'Away',
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
    }
  }

class Game extends React.Component {
    constructor(props){
		super(props);
        this.state = gameObject;
        
    };

    

    render() {
        //const { gameObject } = this.state;
        return (
            <div className='game-body'> 
                <GameInfo gameObject={gameObject}/>
                <Buttons gameObject={gameObject}/>
            </div>
        );
    }
}

export default Game;


    