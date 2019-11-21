//Header with Name, game and info

import React from 'react';
import './form.css';

class GameInfo extends React.Component {
    constructor(props){
		super(props);
        this.state = {
            team: 'Apollo',
            player: 'Hayden',
            opponent: '',
            gameDate: '',
            venue: 'Home',
            qTime: 10
        }
        
    };

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value});

    };

    handleSubmit = (event) => {
        const { loadGameInfo, onRouteChange } = this.props;
        const { team, player, opponent, gameDate, venue, qTime }= this.state;
        let details = [team, player, opponent, gameDate, venue, qTime];
       
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