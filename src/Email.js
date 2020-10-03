import { serverURL } from './server-path';

export const EmailReport = (game, gameInfo) => {


    fetch(serverURL + 'sendemail', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            game: game,
            gameInfo: gameInfo
        })
    })
    .then(response => response.json())
    .then(results => {
        if(results.length > 0){
           return true;
        }
        else return false;
    }).catch(err => {console.log(err)});

};

//export  EmailReport;