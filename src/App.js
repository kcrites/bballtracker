import React from 'react';
import Game from './Game';
import Welcome from './Welcome';
import GameInfo from './GameInfo';
import GameList from './GameList';
import GameReport from './GameReport';
import Player from './Player';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const serverURL = 'http://localhost:3005/';

class App extends React.Component {
  constructor(props){
		super(props);
        this.state = {
          route: 'home',
          gameInfo: [],
          gameId: 0,
        }
    };


   loadGameInfo = (details) => {
      this.setState({gameInfo: details});
      this.startGame(details);
    }

    startGame = (details) => {
   
      fetch(serverURL + 'startgame', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            team: details[0],
            player: details[1],
            opponent: details[2],
            gamedate: details[3],
            venue: details[4],
            qTime: details[5],
          }) 
      })
      .then(response => response.json())
      .then(game => {
        if(game.gameid){
          details.push(game.gameid);
            this.setState({gameInfo: details, gameId: game.gameid});
        } else {
            this.onRouteChange('gameList');
        }
        
     }).catch(err => {console.log(err)});
    }

    //takes game id and uses it in game report
    gameDetails=(game, array) => {
      
      if(array.length === 0) {
        this.getGameInfo(game);
      } else {
        this.setState({gameId: game, gameInfo: array});
        this.onRouteChange('gamereport');
      }
     // this.onRouteChange('gamereport');
    }

    //Called to gather needed info for GameReport from Player (Stats report)
    getGameInfo = (game) => {  
      fetch(serverURL + 'getgameinfo', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            game: game
          }) 
      })
      .then(response => response.json())
      .then(response => {
          let d1 = new Date(response[0].gamedate);
          response[0].gamedate = d1.toLocaleDateString();
          this.setState({gameId: game, gameInfo: response[0]});
          this.onRouteChange('gamereport');
     }).catch(err => {console.log(err)});
    }

    // Custom routing based on the 'route' variable in state
    onRouteChange = (route) => {
       this.setState({route: route});
    }

    renderOption = (route) => {
        const { gameInfo, gameId } = this.state;
        
        if(route === 'home'){
          return <div> <Welcome onRouteChange={this.onRouteChange} /></div> 
        }
        else if (route === 'game'){
          return <div> <Game onRouteChange={this.onRouteChange} gameDetails={this.gameDetails} 
                             gameInfo={this.state.gameInfo} serverURL={serverURL}/></div>
        }  else if (route === 'gamelist' || route === 'end'){
          return <div> <GameList onRouteChange={this.onRouteChange} gameDetails={this.gameDetails}
                                player={'Hayden'} serverURL={serverURL}/></div>
        } else if (route === 'gameinfo'){
          return <div> <GameInfo onRouteChange={this.onRouteChange} loadGameInfo={this.loadGameInfo}/></div>
        } else if (route === 'gamereport'){
          return <div> <GameReport onRouteChange={this.onRouteChange} game={gameId} gameInfo={gameInfo}
                                serverURL={serverURL}/></div>
        } else if (route === 'player'){
          return <div> <Player onRouteChange={this.onRouteChange} player={'Hayden'} serverURL={serverURL}
                                gameDetails={this.gameDetails}/></div>
        }
      }


  render() {

    const { route } = this.state;
      return (
        <div className="App">
          {(route === 'home' ? this.renderOption('home')
          : 
          this.renderOption(route)
          )
        }
        </div>
      );
  }
};

export default App;
