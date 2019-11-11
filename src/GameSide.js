import React ,{ useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import './GameSide.css';

const GameSide = (props) => {

    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="q1"
          aria-expanded={open}
        >
          Quarter 1
        </Button>
        <Collapse in={open}>
          <div id="q1" className='table_text'>
            <table>
                <tbody>
                <tr>
                    <td>2-pointers</td><td>{props.firstQuarter.baskets}</td>
                    <td>Missed</td><td>2</td>
                </tr>
                <tr>
                    <td>3-pointers</td><td>1</td>
                    <td>Missed</td><td>2</td>
                </tr>
                <tr>
                    <td>Free Throws</td><td>1</td>
                    <td>Missed</td><td>2</td>
                </tr>
                <tr>
                    <td>Assists</td><td>1</td>
                    <td>Steals</td><td>2</td>
                </tr>
                <tr>
                    <td>Offensive Rebounds</td><td>1</td>
                    <td>Defensive Rebounds</td><td>2</td>
                </tr>
                <tr>
                    <td>Blocks</td><td>1</td>
                    <td>Personal Fouls</td><td>2</td>
                </tr>
                </tbody>
            </table>
          </div>
        </Collapse>
      </>
    );
  }

export default GameSide;