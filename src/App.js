import React from 'react';
import Game from './Game';
import Welcome from './Welcome';
import GameInfo from './GameInfo';
import GameList from './GameList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props){
		super(props);
        this.state = {
          route: 'home',
          gameInfo: [],
        }
    };


   loadGameInfo = (details) => {
      this.setState({gameInfo: details});
      this.startGame(details);
    }

    startGame = (details) => {
   
      fetch('http://localhost:3005/startgame', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            team: details[0],
            player: details[1],
            opponent: details[2],
            gameDate: details[3],
            venue: details[4],
            qTime: details[5],
        }) 
    })
    .then(response => response.json())
    .then(game => {
        if(game.gameid){
          details.push(game.gameid);
            this.setState({gameInfo: details});
        } else {
            this.onRouteChange('gameList');
        }
        
    }).catch(err => {console.log(err)});
    }


// Custom routing based on the 'route' variable in state
onRouteChange = (route) => {
 
  this.setState({route: route});
}

      renderOption = (route) => {
        //const { stats, pack, loaded, user, indicator } = this.state;
        
        if(route === 'home'){
          return <div> <Welcome onRouteChange={this.onRouteChange} /></div> 
        }
        else if (route === 'game'){
          return <div> <Game onRouteChange={this.onRouteChange} gameInfo={this.state.gameInfo}/></div>
        }  else if (route === 'gamelist' || route === 'end'){
          return <div> <GameList onRouteChange={this.onRouteChange} /></div>
        } else if (route === 'gameinfo'){
          return <div> <GameInfo onRouteChange={this.onRouteChange} loadGameInfo={this.loadGameInfo}/></div>
        }
      }


  render() {

    const { route } = this.state;
      return (
        <div className="App">
          {(route === 'home' ? this.renderOption('gameinfo')
          : 
          this.renderOption(route)
          )
        }
        </div>
      );
  }
};

export default App;
