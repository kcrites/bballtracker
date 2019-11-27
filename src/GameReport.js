
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
            {renderRow(this.state.games)}
        </div>
    );
    }
 };

 export default GameReport;