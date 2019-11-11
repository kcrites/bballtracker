

      import React from 'react';
      import './App.css';
      import 'bootstrap/dist/css/bootstrap.min.css';
      import Container from 'react-bootstrap/Container';
      import Row from 'react-bootstrap/Row';
      import Col from 'react-bootstrap/Col';
      import Card from 'react-bootstrap/Card';
      import Buttons from'./Buttons';
      import Table from 'react-bootstrap/Table';
      import './Buttons.css';

      
      class App extends React.Component {
        constructor(props){
              super(props);
              this.state = {
                route: 'home',
              }
          };
  
        handleGameClick = (event) => {
          this.props(event.target.value);
            };
    
      
        render() {
            const { handleEnd, handlePlay, handleCheckbox, handleTime, handleShot} = this;
          const { route } = this.props;
            return (
              <div className="App App-home">
                <Container >
                    <Row>
                        <Col med={true}>TEAM vs. TEAM</Col>
                    </Row>
                    <Row>
                        <Col >
                            <Card className='App-body'>
                            <Card.Body>
                            <Buttons /></Card.Body></Card></Col>

                    </Row>
                    <Row className="justify-content-md-center">
                    <Col xs={4}>Totals
                        <Table responsive striped bordered hover variant="dark" size="sm">
                            <tbody >
                                <tr>
                                    <td>Points</td>
                                    <td>30</td>
                                </tr>
                                <tr>
                                    <td>Rebounds</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>Assists</td>
                                    <td>14</td>
                                </tr>
                                <tr>
                                    <td>Free Throws</td>
                                    <td>14</td>
                                </tr>
                                <tr>
                                    <td>Personal Fouls</td>
                                    <td>14</td>
                                </tr>
                            </tbody></Table></Col>
                    </Row>
              </Container>
              </div>
            );
        }
      };
      
      export default App;
      //className="App-header"