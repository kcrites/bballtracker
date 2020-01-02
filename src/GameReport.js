import React from 'react';
import logo from './bballlogo.png';
import GameReportQuarter from './GameReportQuarter';
   


 let gamesInit = {
	q1: {
		game: 0,
		quarter: 0,
		started: false,
		timein: 0,
		timeout: 0,
		fg: 0,
		assists: 0,
		blocks: 0,
		blockedpass: 0,
		threefg: 0,
		steals: 0,
		drebounds: 0,
		orebounds: 0,
		pf: 0,
		ft: 0,
		mfg: 0,
		m3fg: 0,
		mft: 0,
		teamscore: 0,
		opponentscore: 0,
		notes: ''
	},
	q2: {
		game: 0,
		quarter: 0,
		started: false,
		timein: 0,
		timeout: 0,
		fg: 0,
		assists: 0,
		blocks: 0,
		blockedpass: 0,
		threefg: 0,
		steals: 0,
		drebounds: 0,
		orebounds: 0,
		pf: 0,
		ft: 0,
		mfg: 0,
		m3fg: 0,
		mft: 0,
		teamscore: 0,
		opponentscore: 0,
		notes: ''
	},
	q3: {
		game: 0,
		quarter: 0,
		started: false,
		timein: 0,
		timeout: 0,
		fg: 0,
		assists: 0,
		blocks: 0,
		blockedpass: 0,
		threefg: 0,
		steals: 0,
		drebounds: 0,
		orebounds: 0,
		pf: 0,
		ft: 0,
		mfg: 0,
		m3fg: 0,
		mft: 0,
		teamscore: 0,
		opponentscore: 0,
		notes: ''
	},
	q4: {
		game: 0,
		quarter: 0,
		started: false,
		timein: 0,
		timeout: 0,
		fg: 0,
		assists: 0,
		blocks: 0,
		blockedpass: 0,
		threefg: 0,
		steals: 0,
		drebounds: 0,
		orebounds: 0,
		pf: 0,
		ft: 0,
		mfg: 0,
		m3fg: 0,
		mft: 0,
		teamscore: 0,
		opponentscore: 0,
		notes: ''
	}
};

 
 class GameReport extends React.Component {
    constructor(props){
        super(props);
        this.state = {
			games: {},
			totals: [],
			qToggle: false
        }
    };

    componentWillMount(){
	
		this.setState({games: gamesInit});
		this.getGameTotals();
		this.getGameDetails();
		
	}
	
	getGameTotals = () => {
		const { game } = this.props;

		fetch('http://localhost:3005/gettotals', {
			method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                game: game
		})
	})
	.then(response => response.json())
	.then(results => {
		if(results.length > 0){
			this.setState({totals: results[0]});
		}
	}).catch(err => {console.log(err)});
	}

	//Quarters Information
    getGameDetails = () => {
        const { game } = this.props;
        
        let gameArr = [];
        fetch('http://localhost:3005/getgame', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                game: game
            })
        })
        .then(response => response.json())
        .then(results => {
            if(results.length > 0){
                results.forEach(e => {
					gameArr.push(e)
				}); 
			
				let gameObj = {
					q1: gameArr[0],
					q2: gameArr[1],
					q3: gameArr[2],
					q4: gameArr[3]
				};
				this.setState({games:gameObj});
            }
        }).catch(err => {console.log(err)});
	}
	

 	gameStats = () => {
        
      //  let attempts = this.state.totals.missedTwo + this.state.totals.missedThree + (this.state.totals.threePointers/3) + (this.state.totals.fieldGoals/2);
      //  let finalArray = [];
    	//console.table(finalArray);
    	//console.log(`Final Stats: ${attempts} attempts`)
	} 
	
	handleHomeClick = () => {
		//this.props.holdGameInfo();
		this.props.onRouteChange('home');
	}

	handleCollapseClick = (event) => {
		this.setState({
			qSelected: event.target.name,
			qToggle: !this.state.qToggle

		});
	}

	handle2Click = (event) => {
		this.setState({
			qToggle: !this.state.qToggle

		});
	}

	handleListClick = (event) => {
		this.props.onRouteChange('gamelist');
	}
    
render(){
	
const { points, assists, orebounds, drebounds, steals, blocks, fg , threefg, ft, mft, mfg, m3fg, blockedpass, teamscore, opponentscore} = this.state.totals;
const { team, opponent, venue, gamedate } = this.props.gameInfo;

let quarterSelected = this.state.qSelected;
let attempts = fg + mfg ;
let made = fg ;
let sp = (100 * made)/attempts;
let ftAttempts = ft + mft;
let ftp = (ftAttempts > 0) ? (100 * ft)/ftAttempts : 0;
let totalRebounds = orebounds + drebounds;
let threeAttempts = threefg + m3fg;
let threeP = (threeAttempts > 0) ? (100 * threefg)/threeAttempts : 0;

    return (
		(this.state.qToggle) ? <GameReportQuarter quarterInfo={this.state.games[quarterSelected]} onRouteChange={this.props.onRouteChange} handle2Click={this.handle2Click} /> : 

        <div>
            <div className="container">
		<div className="pos-f-t">

			<nav className="navbar navbar-dark bg-dark">
			  <p className="navbar-brand">
			    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="Bball Logo"/>
			    &nbsp; Game Report
			  </p>
			</nav>
		</div>

		<p className="pt-1">
		  <button className="btn btn-primary" name="q1" type="button" data-toggle="collapse" onClick={this.handleCollapseClick} data-target="#collapseQ1" aria-expanded="false" aria-controls="collapseExample">
		    Quarter 1
		  </button>
		  <button className="btn btn-primary" name="q2" type="button" data-toggle="collapse"  onClick={this.handleCollapseClick} data-target="#collapseQ2" aria-expanded="false" aria-controls="collapseExample">
		    Quarter 2
		  </button>
		  <button className="btn btn-primary" name="q3" type="button" data-toggle="collapse" onClick={this.handleCollapseClick} data-target="#collapseQ3" aria-expanded="false" aria-controls="collapseExample">
		    Quarter 3
		  </button>
		  <button className="btn btn-primary" name="q4" type="button" data-toggle="collapse" onClick={this.handleCollapseClick} data-target="#collapseQ4" aria-expanded="false" aria-controls="collapseExample">
		    Quarter 4
		  </button>
		</p>

		<h2>Game Totals</h2>

			<div className='row'>
				<div className="col-sm-6">
					<div className="card shadow">
				  		<div className="card-body">
								<h5 className="card-title">Points: {points}</h5>
                                <p className="card-text">{fg} FG <strong>|</strong> {threefg} 3FG <strong>|</strong> {ft} FT</p>
				  		</div>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="card shadow">
				  		<div className="card-body">
						  <h5 className="card-title">Rebounds: {totalRebounds} </h5>
                            <p className="card-text">{orebounds} Offensive <strong>|</strong> {drebounds} Defensive</p>
				  		</div>
					</div>
				</div>
			</div>

			<div className="row">
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
				  <h5 className="card-header">Shooting</h5>
				  <ul className="list-group list-group-flush text-left">
                        <div className="list-group-item"><strong>Field goals:</strong> {made} for {attempts}, {sp.toFixed(1)}% </div>
                        <div className="list-group-item"><strong>3 Pointers:</strong> {threefg} for {threeAttempts}, {threeP.toFixed(1)}% </div>
                        <div className="list-group-item"><strong>Free throws:</strong> {ft} for {ftAttempts}, {ftp.toFixed(1)}% </div>
			      </ul>
				  </div>
			    </div>
			  </div>
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
				  <h5 className="card-header">Play Stats</h5>
				  <ul className="list-group list-group-flush text-left">
				  		<div className="list-group-item"><strong>Assists:</strong> {assists}</div>
						<div className="list-group-item"><strong>Steals: </strong>{steals}</div>
                        <div className="list-group-item"><strong>Blocks: </strong>{blocks}</div>
                        <div className="list-group-item"><strong>Blocked Passes:</strong> {blockedpass}</div>
						</ul>
			      </div>
			    </div>
			  </div>
			</div>
			<div className="row">
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
				  <h5 className="card-header">Score</h5>
				  <ul className="list-group list-group-flush text-left">
                         <div className="list-group-item"><strong>{team}:</strong> {teamscore}</div>
						 <div className='list-group-item'><strong>{opponent}:</strong> {opponentscore}</div>		       
			      </ul>
				  </div>
			    </div>
			  </div>
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
			        <h5 className="card-header">Game Info</h5>
					<ul className="list-group list-group-flush text-left">
					<div className="list-group-item"><strong>Date</strong> {gamedate}</div>	
					<div className="list-group-item"><strong>Team</strong> {team}</div>	
					<div className="list-group-item"><strong>Opponent</strong> {opponent}</div>	
					<div className="list-group-item"><strong>Venue</strong> {venue}</div>	
					</ul>
			      </div>
			    </div>
			  </div>
			</div>
		
			<nav className="navbar navbar-dark bg-dark "> 
				<div className="container">
	 			 <p className="navbar-brand" onClick={this.handleHomeClick}><small>Home</small></p>
				  <p className="navbar-brand" onClick={this.handleListClick}><small>Game List</small></p>
	 			</div>
			</nav>
	

	</div>

        </div>
    );
    }
 };

 export default GameReport;