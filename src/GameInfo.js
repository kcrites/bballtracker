//Header with Name, game and info

import React from 'react';
import './form.css';

class GameInfo extends React.Component {
    constructor(props){
		super(props);
        this.state = {
            team: 'Apollo',
            player: 'Hayden',
            opponent: 'MBCA',
            gameDate: '2019-11-30',
            venue: 'Home',
            qTime: 10,
            gameId: 0,
        }
        
    };

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value});

    };

     handleSubmit = () => {
        const { loadGameInfo, onRouteChange } = this.props;
        const { team, player, opponent, gameDate, venue, qTime }= this.state;
        let details = [team, player, opponent, gameDate, venue, qTime];
        //PREVENT DEFAULT
        //preventDefault();
                      
      /*   fetch('http://localhost:3005/startgame', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                team: team,
                player: player,
                opponent: opponent,
                gameDate: gameDate,
                venue: venue,
                qTime: qTime,
            }) 
        })
        .then(response => response.json())
        .then(game => {
            if(game.id){
                //details.push(results.id);
               //loadGameInfo(details, game);
                onRouteChange('game'); 
            } else {
                onRouteChange('gameList');
            }
            
        }).catch(err => {console.log(err)});
      // console.table(details); */
     //details.push(15);
        loadGameInfo(details);
        onRouteChange('game'); 

    }

    handleSubmit2 = (event) => {
        const { loadGameInfo, onRouteChange } = this.props;
        const { team, player, opponent, gameDate, venue, qTime }= this.state;
        let details = [team, player, opponent, gameDate, venue, qTime];
        
   let gameId = 12;
       details.push(gameId);
       console.table(details);
      loadGameInfo(details);
       onRouteChange('game'); 

    };

    render() {
        //const { player, team, opponent, gameDate, venue } = this.props.gameObject;
        return (
            <div className="container list-body"> 
              <form>
                <fieldset className="form-group">
                <legend>Game Information</legend>

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="team">Team</label>
                            <select className="form-control" onChange={this.handleInput} id="team" name="team"><option value="Apollo">Apollo U18-3</option><option value="ISA">ISA Varsity</option></select>
                        </div>

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="player">Player</label>
                            <select className="form-control" onChange={this.handleInput} id="player" name="player"><option value="hayden">Hayden</option></select>
                        </div>

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="opponent">Opponent</label>
                            <input className="form-control" onChange={this.handleInput} id="opponent" name="opponent" type="text"></input>
                        </div>

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="gameDate">Date</label>
                            <input className="form-control" onChange={this.handleInput} id="gameDate" name="gameDate" type="date"></input>
                        </div>

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="venue">Venue</label>
                            <select className="form-control" onChange={this.handleInput} id="venue" name="venue"><option value="Home">Home</option><option value="Away">Away</option></select>
                        </div>
                    
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                    
                        

                    </fieldset>
                </form>
            </div>
        );
    }
}

export default GameInfo;