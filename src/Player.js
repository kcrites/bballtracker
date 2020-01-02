
    import React from 'react';
    import logo from './bballlogo.png'
  
    const fixDate = (array) => {
        array.map((item) => {
        let d1 = new Date(item.gamedate);
        item.gamedate = d1.toLocaleDateString();
        return array;
    })
  }

  
  const renderRow= (array, handleButtonClick) =>{
     fixDate(array);
      return array.map((item, index)  => 
            <tr key={index}>
                 <th scope="row">{index+1}</th>
                    <td>{item.points}</td>
                    <td>{item.fg}</td>
                    <td>{item.assists}</td>
                    <td>{item.blocks}</td>
                    <td>{item.blockedpass}</td>
                    <td>{item.threefg}</td>
                    <td>{item.steals}</td>
                    <td>{item.drebounds}</td>
                    <td>{item.orebounds}</td>
                    <td>{item.pf}</td>
                    <td>{item.ft}</td>
                <th scope="col"><button type="button" value={item.gameid} onClick={handleButtonClick} className="btn btn-info">Details</button></th>
            </tr>
    
        );
  }
 
 class Player extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            player: []
        }
    };

    componentWillMount(){
        this.getStats();
    }

    getStats = () => {
        const { player } = this.props;
        
        let playerArr = [];
        fetch('http://localhost:3005/getplayertotals', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                player: player
            })
        })
        .then(response => response.json())
        .then(results => {
            if(results.length > 0){
                results.forEach(e => {playerArr.push(e)});
                this.setState({player: playerArr});
            }
        }).catch(err => {console.log(err)});
    }

handleButtonClick = (event) => {
  /*   let gameTemp = parseInt(event.target.value);
    let location = this.state.games.findIndex(item => item.gameid === gameTemp)
   console.log(location, event.target.value);
    this.props.gameDetails(event.target.value, this.state.games[location]); */
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
                <p className="navbar-brand" >
                    <img src={logo}  width="30" height="30" className="d-inline-block align-top" alt="Bball Logo"/>
                    &nbsp; BBall Player Stats
                </p>
            </nav>
            </div>

		<table className="table table-hover">
		  <thead>
		    <tr>
		      <th scope="col">#</th>
		      <th scope="col">Points</th>
		      <th scope="col">Field Goals</th>
		      <th scope="col">Assists</th>
              <th scope="col">Blocks</th>
              <th scope="col">Blocked Passes</th>
              <th scope="col">3 Pointers</th>
              <th scope="col">Steals</th>
              <th scope="col">Def Rebounds</th>
              <th scope="col">Off Rebounds</th>
              <th scope="col">Personal Fouls</th>
              <th scope="col">Free Throws</th>
		      <th scope="col">Details</th>
		    </tr>
		  </thead>
		  <tbody>
            {renderRow(this.state.player, this.handleButtonClick)}
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


 export default Player;