
    import React from 'react';
   
    const fixDate = (array) => {
        array.map((item) => {
        let d1 = new Date(item.gamedate);
        item.gamedate = d1.toLocaleDateString();
        return array;
    })
  }
  
  const renderRow= (array) =>{
     //fixDate(array);
      return array.map((item, index)  => 
                <tr key={index} className="stripe-dark">
                <td className="pa3">{index+1}</td>
                  <td className="pa3">{item.game}</td>
                  <td className="pa3">{item.quarter}</td>
                  <td className="pa3">{item.fg}</td>
                  <td className="pa3">{item.teamscore}</td>
                </tr>
              
        );
  }
 
 class GameReport extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            games: []
        }
    };

    componentWillMount(){
        this.getGameDetails();
    }

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
                results.forEach(e => {gameArr.push(e)});
                this.setState({games:gameArr});
            }
        }).catch(err => {console.log(err)});
    }
    
render(){
	

    return (
        <div>
            <div className="container">
		<div className="pos-f-t">

			<nav className="navbar navbar-dark bg-dark">
			  <a className="navbar-brand" href="#">
			    <img src="./bball_logo.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
			    Game Report
			  </a>
			</nav>
		</div>

		<p className="pt-1">
		  <a className="btn btn-primary" data-toggle="collapse" href="#collapseQ1" role="button" aria-expanded="false" aria-controls="collapseExample">
		    Quarter 1
		  </a>
		  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseQ2" aria-expanded="false" aria-controls="collapseExample">
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
		    QUARTER 1 STATS
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
	<h5 className="card-title">Points: 77</h5>
	<p className="card-text">55/55 shooting (80%) - 5 FG - 2 3FG - 2 FT</p>
				  		</div>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="card shadow">
				  		<div className="card-body">
				   			<h5 className="card-title">Assists: 6</h5>
				    		
				  		</div>
					</div>
				</div>
			</div>

			<div className="row">
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
			        <h5 className="card-title">Rebounds: 5</h5>
			        <p className="card-text">3 Offensive - 2 Defensive</p>
			      </div>
			    </div>
			  </div>
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
			        <h5 className="card-title">Steals: 5</h5>
			      </div>
			    </div>
			  </div>
			</div>


			<div className="row">
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
			        <h5 className="card-title">Free Throws: 4 for 5</h5>
			        <p className="card-text">FTP 90%</p>
			       
			      </div>
			    </div>
			  </div>
			  <div className="col-sm-6">
			    <div className="card shadow">
			      <div className="card-body">
			        <h5 className="card-title">Blocks: 5</h5>
			        
			      </div>
			    </div>
			  </div>
			</div>
		
			<nav className="navbar navbar-dark bg-dark "> 
				<div className="container">
	 			 <a className="navbar-brand" href="#"><small>Home</small></a>
	 			</div>
			</nav>
	

	</div>
           {renderRow(this.state.games)}
        </div>
    );
    }
 };

 export default GameReport;