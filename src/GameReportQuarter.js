import React from 'react';
import logo from './bballlogo.png';

const GameReportQuarter = (props) => {
  const{ quarter, started, timein, timeout, fg, assists, blocks, blockedpass, threefg, steals,
            drebounds, orebounds, pf, ft, mfg, m3fg, mft, teamscore, opponentscore, notes} = props.quarterInfo;

    let attempts = fg + threefg + mfg + m3fg;
    let points = fg + threefg + ft;
    let made = fg + threefg;
    let sp = (100 * made)/attempts;
    let ftAttempts = ft + mft;
    let ftp = (ftAttempts > 0) ? (100 * ft)/ftAttempts : 0;
    let totalRebounds = orebounds + drebounds;

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
                        <h5 className="card-title">Blocks: {blocks}, Blocked Passes: {blockedpass}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card shadow">
                      <div className="card-body">
                        <h5 className="card-title">Time: {started}, timein{timein}, timeout{timeout}</h5>
                        
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
                  <div className="col-sm-6">
                    <div className="card shadow">
                      <div className="card-body">
                         <h5 className="card-title">Score: Us {teamscore}, Them {opponentscore}</h5>
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