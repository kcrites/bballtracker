import React from 'react';
import logo from './bball.png';
import Game from './Game';
import './App.css';

class App extends React.Component {
  constructor(props){
		super(props);
        this.state = {
          route: 'home',
        }
    };

  handleGameClick = () => {
    this.setState({route: 'game'});
      };

      renderOption = (route) => {
        if(route === 'game'){
          return <div><Game /></div>
        }
      }

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="Bball-logo" alt="logo" /><br></br>
            <button onClick={this.handleGameClick}>
              Record a new game
            </button>
            <p>Look at Stats</p>
          </header>
          {(this.state.route === 'game' ? this.renderOption('game')
        : 
  
            <p>SIGNIN</p>
            )
        }
        </div>
      );
  }
};

export default App;
