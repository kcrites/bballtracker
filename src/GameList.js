
    import React from 'react';
    //import './bballlogo.png'
  
    const fixDate = (array) => {
        array.map((item) => {
        let d1 = new Date(item.gamedate);
        item.gamedate = d1.toLocaleDateString();
        return array;
    })
  }
  
  const renderRow= (array) =>{
     fixDate(array);
      return array.map((item, index)  => 
            <tr key={index}>
                 <th scope="row">{index+1}</th>
                    <td>{item.gamedate}</td>
                    <td>{item.team}</td>
                    <td>{item.opponent}</td>
                    <td>W</td>
                <th scope="col"><button type="button" className="btn btn-info">Details</button></th>
            </tr>
    
        );
  }
 
 class GameList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            games: []
        }
    };

    componentWillMount(){
        this.getGame();
    }

    getGame = () => {
        const { player } = this.props;
        
        let gameArr = [];
        fetch('http://localhost:3005/gamelist', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                player: player
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
handleButtonClick = (event) => {
    this.props.onRouteChange('gamereport');
}
handleHomeClick = (event) => {
    this.props.onRouteChange("home");
}
    
render(){
    return (
        <div>
            <div className="container">
		        <div className="pos-f-t">
	
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="www.krc.com">
                    <img src="./bball_logo.png" width="30" height="30" classNme="d-inline-block align-top" alt=""/>
                    BBall Game List
                </a>
            </nav>
            </div>

		<table className="table table-hover">
		  <thead>
		    <tr>
		      <th scope="col">#</th>
		      <th scope="col">Date</th>
		      <th scope="col">Team</th>
		      <th scope="col">Opponent</th>
		      <th scope="col">W/L</th>
		      <th scope="col">Details</th>
		    </tr>
		  </thead>
		  <tbody>
	{/* 	    <tr>
		      <th scope="row">1</th>
		      <td>11/11/2019</td>
		      <td>Apollo</td>
		      <td>MBCA</td>
		      <td>W</td>
		      <th scope="col"><button type="button" className="btn btn-info">Details</button></th>
		    </tr>
		    <tr>
		      <th scope="row">2</th>
		      <td>12/12/2019</td>
		      <td>Apollo</td>
		      <td>Triple Threat</td>
		      <td>W</td>
		      <th scope="col"><button type="button" className="btn btn-outline-secondary">Details</button></th>
		    </tr>
		    <tr>
		      <th scope="row">3</th>
		      <td>12/14/2019</td>
		      <td>ISA V</td>
		      <td>ISD</td>
		      <td>W</td>
		      <th scope="col"><button type="button" className="btn btn-outline-dark">Details</button></th>
		    </tr> */}
            {renderRow(this.state.games)}
		  </tbody>
		</table>

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


 export default GameList;