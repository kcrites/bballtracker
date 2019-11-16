//Header with Name, game and info

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

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
            <div> 
              <Card >
                <Card.Title>Game Information</Card.Title>
                <Card.Subtitle className="md-2 text-muted">Input info for this game</Card.Subtitle>
                <Card.Body>
                    <Table striped bordered hover size="med">
                        <tbody>
                        <tr>
                            <td>Team</td><td><select onChange={this.handleInput} name="team"><option value="Apollo">Apollo U18-3</option><option value="ISA">ISA Varsity</option></select></td>
                        </tr>
                        <tr>
                            <td>Player</td><td>Hayden</td>
                        </tr>
                        <tr>
                            <td>Opponent</td><td><input onChange={this.handleInput} name="opponent" type="text"/></td>
                        </tr>
                        <tr>
                            <td>Date</td><td><input name="gameDate" onChange={this.handleInput} type="date" /></td>
                        </tr>
                        <tr>
                            <td>Venue</td><td><select name="venue" onChange={this.handleInput}><option value="Home">Home</option><option value="Away">Away</option></select></td>
                        </tr>
                        <tr>
                            <td>Quarter Length</td><td><select name="qTime" ><option value="10">10 Minutes</option></select></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><Button onClick={this.handleSubmit}>Submit</Button></td>
                        </tr>
                        </tbody>
                    </Table>

                </Card.Body>
                </Card>
            </div>
        );
    }
}

export default GameInfo;