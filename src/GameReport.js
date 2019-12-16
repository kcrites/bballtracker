import React from 'react';
import logo from './bballlogo.png';
   
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
		console.log(`game in report: ${this.props.game}`)
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
		this.props.onRouteChange('home');
	}

	handleCollapseClick = (event) => {
		this.setState({
			showTermsPopup: !this.state.showTermsPopup
		});
		
	}
    
render(){
	
const { points, assists, orebounds, drebounds, steals, blocks, fg , threefg, ft, mft, mfg, m3fg} = this.state.totals;


let attempts = fg + threefg + mfg + m3fg;
let made = fg + threefg;
let sp = (100 * made)/attempts;
let ftAttempts = ft + mft;
let ftp = (ftAttempts > 0) ? (100 * ft)/ftAttempts : 0;
let totalRebounds = orebounds + drebounds;

    return (
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
		  <a className="btn btn-primary" data-toggle="collapse" href="#collapseQ1" role="button" aria-expanded="false" aria-controls="collapseExample">
		    Quarter 1
		  </a>
		  <button className="btn btn-primary" type="button" data-toggle="collapse"  data-target="#collapseQ2" aria-expanded="false" aria-controls="collapseExample">
		    Quarter 2
		  </button>
		  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseQ3" aria-expanded="false" aria-controls="collapseExample">
		    Quarter 3
		  </button>
		  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseQ4" aria-expanded="false" aria-controls="collapseExample">
		    Quarter 4
		  </button>
		</p>
		<div className="collapse" id="collapseQ1">
		  <div className="card card-body">
		    <p>Quarter 1 Stats</p>
			<p>Shots {this.state.games.q1.fg}</p>
		  </div>
		</div>
		<div className="collapse" id="collapseQ2">
		  <div className="card card-body">
		    QUARTER 2 STATS
		  </div>
		</div>
		<div className="collapse" id="collapseQ3">
		  <div className="card card-body">
		    QUARTER 3 STATS
		  </div>
		</div>
		<div className="collapse" id="collapseQ4">
		  <div className="card card-body">
		    QUARTER 4 STATS
		  </div>
		</div>
		

		<h2>Game Totals</h2>

			<div className='row'>
				<div className="col-sm-6">
					<div className="card shadow">
				  		<div className="card-body">
							<h5 className="card-title">Points: {points}</h5>
								<p className="card-text">{made}/{attempts} shooting ({sp.toFixed(2)}%) | {fg} FG | {threefg} 3FG | {ft} FT</p>
				  		</div>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="card shadow">
				  		<div className="card-body">
							<h5 className="card-title">Assists: {assists}</h5>
				  		</div>
					</div>
				</div>
			</div>

			<div className="row">
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
			        <h5 className="card-title">Rebounds: {totalRebounds} </h5>
			        <p className="card-text">{orebounds} Offensive | {drebounds} Defensive</p>
			      </div>
			    </div>
			  </div>
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
			        <h5 className="card-title">Steals: {steals}</h5>
			      </div>
			    </div>
			  </div>
			</div>
			<div className="row">
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
			        <h5 className="card-title">Free Throws: {ft} for {ftAttempts} </h5>
			        <p className="card-text">FTP {ftp}% </p>		       
			      </div>
			    </div>
			  </div>
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
			        <h5 className="card-title">Blocks: {blocks}</h5>
			      </div>
			    </div>
			  </div>
			</div>
		
			<nav className="navbar navbar-dark bg-dark "> 
				<div className="container">
	 			 <p className="navbar-brand" onClick={this.handleHomeClick}><small>Home</small></p>
	 			</div>
			</nav>
	

	</div>

        </div>
    );
    }
 };

 export default GameReport;