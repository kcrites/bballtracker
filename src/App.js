import React from 'react';
import Game from './Game';
import Welcome from './Welcome';
import GameInfo from './GameInfo';
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
        }  else if (route === 'report'){
          return <div> <Game onRouteChange={this.onRouteChange} /></div>
        } else if (route === 'gameinfo'){
          return <div> <GameInfo onRouteChange={this.onRouteChange} loadGameInfo={this.loadGameInfo}/></div>
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
