import React from 'react';
import logo from './bballlogo.png';

const GameReportQuarter = (props) => {
  const{ quarter, started, timein, timeout, fg, assists, blocks, blockedpass, threefg, steals,
            drebounds, orebounds, pf, ft, mfg, m3fg, mft, teamscore, opponentscore, notes} = props.quarterInfo;

    let attempts = fg + threefg + mfg + m3fg;
    let points = (2*fg) + (3*threefg) + ft;
    let made = fg + threefg;
    let sp = (100 * made)/attempts;
    let ftAttempts = ft + mft;
    let ftp = (ftAttempts > 0) ? (100 * ft)/ftAttempts : 0;
    let totalRebounds = orebounds + drebounds;
    let threeAttempts = threefg + m3fg;
    let threeP = (threeAttempts > 0) ? (100 * threefg)/threeAttempts : 0;

    const handleHomeClick = () => {
		props.onRouteChange('home');
    }
    
    return (
        
            <div>
                <div className="container">
            <div className="pos-f-t">
    
                <nav className="navbar navbar-dark bg-dark">
                  <p className="navbar-brand">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="Bball Logo"/>
                    &nbsp; Quarter {quarter} Report
                  </p>
                </nav>
            </div>
    

            <h2>Quarter {quarter} Totals</h2>
    
                <div className='row'>
                    <div className="col-sm-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">Points: {points}</h5>
                                <p className="card-text">{fg} FG | {threefg} 3FG | {ft} FT</p>
                            </div>
                        </div>
                    </div>               
                    <div className="col-sm-6">
                        <div className="card shadow">
                          <div className="card-body">
                            <h5 className="card-title">Rebounds: {totalRebounds} </h5>
                            <p className="card-text">{orebounds} Offensive | {drebounds} Defensive</p>
                        </div>
                    </div>
                  </div>
                </div>
    
                <div className="row">
                <div className="col-sm-6">
                        <div className="card shadow">
                            <div className="card-body">
                              <h5 className="card-title">Shooting:</h5>
                                <div className="card-text"><strong>Field goals:</strong> {made} for {attempts}, {sp.toFixed(1)}% </div>
                                <div className="card-text"><strong>3 Pointers:</strong> {threefg} for {m3fg}, {threeP.toFixed(1)}% </div>
                                <div className="card-text"><strong>Free throws:</strong> {ft} for {ftAttempts}, {ftp.toFixed(1)}% </div>
                            </div>
                        </div>
                    </div>
                  <div className="col-sm-6">
                    <div className="card shadow">
                      <div className="card-body">
                      <h5 className="card-title">Play Stats</h5>
                        <div className="card-text "> <strong>Steals: </strong>{steals} | <strong>Assists:</strong> {assists}</div>
                      
                        <div className="card-text"><strong>Blocks: </strong>{blocks}</div>
                        <div className="card-text"><strong>Blocked Passes:</strong> {blockedpass}</div>
                      </div>
                    </div>
                  </div>
                </div>
               
                <div className="row">
                  <div className="col-sm-6">
                    <div className="card shadow">
                      <div className="card-body">
                        <h5 className="card-title">Time</h5>
                        <div className="card-text">{(started) ? 'Started' : ""} timein {timein}, timeout {timeout}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card shadow">
                      <div className="card-body">
                        <h5 className="card-title">Personal Fouls: {pf}</h5>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="row">
                  <div className="col-sm-6">
                    <div className="card shadow">
                      <div className="card-body">
                         <h5 className="card-title">Score</h5>
                         <div className="card-text">Team {teamscore} - Opponent {opponentscore}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card shadow">
                      <div className="card-body">
                        <h5 className="card-title">Notes: {notes}</h5>
                      </div>
                    </div>
                  </div>
                  </div>
                
            
                <nav className="navbar navbar-dark bg-dark "> 
                    <div className="container">
                      <p className="navbar-brand" onClick={handleHomeClick}><small>Home</small></p>
                      <p className="navbar-brand" onClick={props.handle2Click}><small>Back to the Game</small></p>
                     </div>
                </nav>

        </div>
    
            </div>
    );
    }


export default GameReportQuarter;