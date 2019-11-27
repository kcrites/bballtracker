
    import React from 'react';
    //import Search from 'Search';
    import './App.css';
    import 'bootstrap/dist/css/bootstrap.min.css';
 
 const GameList = (props) => {

    const getGame () => {
        const { player } = this.props;
    fetch('http://localhost:3005/gamelist', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            player: player
        })
    })
    .then(response => response.json())
    .then(results => {
        if(results.id){
           
            console.log(results);
        }
    }).catch(err => {console.log(err)});
}

    return (
        <div>GAME LIST GOES HERE</div>
    );
 }


 export default GameList;