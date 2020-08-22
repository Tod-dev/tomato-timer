import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  ButtonGroup,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  ButtonToolbar,
  Image,
} from "react-bootstrap";

import MyContext from "../../MyContext";
import "./Main.css";
import settings from "../../images/settings.png";

const Main = (props) => {
  const { timer } = useContext(MyContext);

  useEffect(() => {
    setTime(timer * 60);
  }, [timer]);

  const [time, setTime] = useState(timer * 60);
  const [isGoing, setIsGoing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isGoing) {
      return;
    }
    if (time === 0) {
      setIsGoing(false);
      setIsDone(true);
      return;
    }
    const timeout = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timeout);
  }, [time, isGoing]);

  return (
    <div className="myMainContainer bg-light rounded">
      {isDone ? (
        <Alert variant="warning" className="marginTop alert">
          Pomodoro Timer ended!
        </Alert>
      ) : null}
      <ButtonToolbar
        aria-label="Toolbar with button groups"
        className="buttonContainer marginTop"
      >
        <ButtonGroup size="lg">
          <Button variant="success" onClick={() => setIsGoing(true)}>
            Start
          </Button>
          <Button variant="danger" onClick={() => setIsGoing(false)}>
            Stop
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setTime(timer * 60);
              setIsGoing(false);
            }}
          >
            Reset
          </Button>
        </ButtonGroup>
        <ButtonGroup size="lg">
          <Button variant="info" onClick={() => {}}>
            <Image
              src={settings}
              alt="settings"
              style={{ width: 30, height: 30 }}
            />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <div className="timer">
        {parseInt(time / 60)} : {parseInt(time % 60) < 10 ? "0" : null}
        {parseInt(time % 60)}
      </div>
      <div className="docs">
        <Card>
          <Card.Body>
            <Card.Title>Keyboard Shortcuts</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <b>SPACE</b>: Start or Stop the timer | <b>ALT + R</b>: Reset
              Timer
            </ListGroupItem>
            <ListGroupItem>
              <b>ALT + P</b> : Pomodoro
            </ListGroupItem>
            <ListGroupItem>
              <b>ALT + S</b>: Short Break | <b>ALT + L</b>: Long Break
            </ListGroupItem>
          </ListGroup>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Settings</Card.Title>
            <Card.Subtitle>
              You can set custom times, audio tone and volume via Settings.
            </Card.Subtitle>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              You can change the audio tone and volume via Settings
            </ListGroupItem>
            <ListGroupItem>
              Desktop Notifications are currently supported in Chrome, Firefox
              and Safari
            </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    </div>
  );
};

export default Main;
