
    import React from 'react';
    import Header from './Header';
  
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
                    <td>{(item.drebounds + item.orebounds)}</td>
                    <td>{item.assists}</td>
                    <td>{item.steals}</td>
                    <td>{item.blocks}</td>
                    <td>{item.turnovers}</td>
                    <td>{item.fg}</td>
                    <td>{item.threefg}</td>
                    <td>{item.drebounds}</td>
                    <td>{item.orebounds}</td>
                    <td>{item.pf}</td>
                    <td>{item.ft}</td>
                    <td>{item.blockedpass}</td>
                <th scope="col"><button type="button" value={item.game} onClick={handleButtonClick} className="btn btn-info btn-sm">Details</button></th>
            </tr>
    
        );
  }
 
 class Player extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            player: [],
            games: 0,
            totals: {
                pointsTotal: 0,
                reboundsTotal: 0,
                assistTotal: 0,
                stealsTotal: 0,
                fgTotal: 0,
                threefgTotal: 0,
                ftTotal: 0,
                blocksTotal: 0,
                bpTotal: 0,
                dreboundTotal: 0,
                oreboundTotal: 0,
                pfTotal: 0,
                turnoverTotals: 0
            }  
        } 
    };

    componentWillMount(){
        this.getStats();
    }

    getStats = () => {
        const { player, serverURL } = this.props;
        
        let playerArr = [];
        fetch(serverURL + 'getplayertotals', {
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
                this.setState({player: playerArr, games: playerArr.length});
                this.getTotals(playerArr);
            }
        }).catch(err => {console.log(err)});
    }

    getTotals = (array) => {
        let pointsTotal = 0, reboundsTotal = 0, assistTotal = 0, stealsTotal = 0;
        let fgTotal = 0, threefgTotal = 0, ftTotal = 0, blocksTotal = 0, bpTotal = 0;
        let dreboundTotal = 0, oreboundTotal = 0, pfTotal = 0, turnoverTotals = 0;

        array.map((e) => {
           pointsTotal += e.points;
           reboundsTotal += (e.orebounds + e.drebounds);
           assistTotal += e.assists;
           stealsTotal += e.steals;
           fgTotal += e.fg;
           threefgTotal += e.threefg;
           ftTotal += e.ft;
           blocksTotal += e.blocks;
           bpTotal += e.blockedpass;
           dreboundTotal += e.drebounds;
           oreboundTotal += e.orebounds;
           pfTotal += e.pf;
           turnoverTotals += e.turnovers;
           return array;
        })
       
        this.setState({totals: {
            pointsTotal: pointsTotal,
            reboundsTotal: reboundsTotal,
            assistTotal: assistTotal,
            stealsTotal: stealsTotal,
            fgTotal: fgTotal,
            threefgTotal: threefgTotal,
            ftTotal: ftTotal,
            blocksTotal: blocksTotal,
            bpTotal: bpTotal,
            dreboundTotal: dreboundTotal,
            oreboundTotal: oreboundTotal,
            pfTotal: pfTotal,
            turnoverTotals: turnoverTotals
        }})
    }
   
handleButtonClick = (event) => {
    let gameTemp = parseInt(event.target.value);
    let array = [];
    this.props.gameDetails(gameTemp, array);
   
}

handleHomeClick = (event) => {
    this.props.onRouteChange("home");
}
    
render(){
    const{ pointsTotal, reboundsTotal, assistTotal, stealsTotal, fgTotal, threefgTotal,
    ftTotal, blocksTotal, bpTotal, dreboundTotal, oreboundTotal, pfTotal, turnoverTotals } = this.state.totals;
    const { games } = this.state;
    const { player } = this.props;
    let headerInfo = {type: 'player', title: 'BBall Player Stats', player: player, quarter: ''};
    return (
        <div>
            <div className="container">
             <Header headerInfo={headerInfo} />
            <h3>Totals</h3>
        <div style={{overflow: 'auto'}}>
            <table className='table table-small'>
                <thead>
                    <tr>
                        <th scope="col">G</th>
                        <th scope="col">Points</th>
                        <th scope="col">Rebounds</th>
                        <th scope="col">Assists</th>
                        <th scope="col">Steals</th>
                        <th scope="col">FG</th>
                        <th scope="col">3FG</th>
                        <th scope="col">FT</th>
                        <th scope="col">Blocks</th>
                        <th scope="col">Tips</th>
                        <th scope="col">TO</th>
                        <th scope="col">D Rebounds</th>
                        <th scope="col">O Rebounds</th>
                        <th scope="col">PF</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{games}</td>
                        <td>{pointsTotal}</td>
                        <td>{reboundsTotal}</td>
                        <td>{assistTotal}</td>
                        <td>{stealsTotal}</td>
                        <td>{fgTotal}</td>
                        <td>{threefgTotal}</td>
                        <td>{ftTotal}</td>
                        <td>{blocksTotal}</td>
                        <td>{bpTotal}</td>
                        <td>{turnoverTotals}</td>
                        <td>{dreboundTotal}</td>
                        <td>{oreboundTotal}</td>
                        <td>{pfTotal}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <h3>Game Stats</h3>
            <div style={{overflow: 'auto'}}>
		<table className="table table-hover table-small">
		  <thead>
		    <tr>
		      <th scope="col">#</th>
		      <th scope="col">Points</th>
		      <th scope="col">Rebounds</th>
		      <th scope="col">Assists</th>
              <th scope="col">Steals</th>
              <th scope="col">Blocks</th>
              <th scope="col">TO</th>
              <th scope="col">FG</th>
              <th scope="col">3 FG</th>
              <th scope="col">D Reb</th>
              <th scope="col">O Reb</th>
              <th scope="col">PF</th>
              <th scope="col">FT</th>
              <th scope="col">Tips</th>
		      <th scope="col">Details</th>
		    </tr>
		  </thead>
		  <tbody>
            {renderRow(this.state.player, this.handleButtonClick)}
		  </tbody>
		</table> </div>

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