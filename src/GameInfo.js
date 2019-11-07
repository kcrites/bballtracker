//Header with Name, game and info

import React from 'react';

class GameInfo extends React.Component {
    constructor(props){
		super(props);
        this.state = {}
        
    };
    render() {
        const { player, team, opponent, gameDate, venue } = this.props.gameObject;
        return (
            <div> 
                <table>
                    <thead><tr><td colSpan='2'>Game Information</td></tr></thead>
                    <tbody>
                        <tr>
                            <td>{team} vs. {opponent}</td>
                            <td>{gameDate}</td>
                        </tr>
                        <tr>
                            <td>Player: {player}</td>
                            <td>Venue: {venue}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GameInfo;