
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
                    <td>{item.gamedate}</td>
                    <td>{item.team}</td>
                    <td>{item.opponent}</td>
                  
                <th scope="col"><button type="button" value={item.gameid} onClick={handleButtonClick} className="btn btn-info">Details</button></th>
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
    let gameTemp = parseInt(event.target.value);
    let location = this.state.games.findIndex(item => item.gameid === gameTemp)
   // console.log(location, event.target.value);
    this.props.gameDetails(event.target.value, this.state.games[location]);
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
                    &nbsp; BBall Game List
                </p>
            </nav>
            </div>

		<table className="table table-hover">
		  <thead>
		    <tr>
		      <th scope="col">#</th>
		      <th scope="col">Date</th>
		      <th scope="col">Team</th>
		      <th scope="col">Opponent</th>
		     
		      <th scope="col">Details</th>
		    </tr>
		  </thead>
		  <tbody>
            {renderRow(this.state.games, this.handleButtonClick)}
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