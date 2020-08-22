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
import KeyboardEventHandler from "react-keyboard-event-handler";

import MyContext from "../../MyContext";
import "./Main.css";
import settings from "../../images/settings.png";
import tomato from "../../images/tomato.png";

const Main = () => {
  const { timer } = useContext(MyContext);

  useEffect(() => {
    setTime(timer * 60);
  }, [timer]);

  const [time, setTime] = useState(timer * 60);
  const [isGoing, setIsGoing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    //only run 1 time at the first time
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, []);

  const notify = () => {
    const options = {
      body: "Your Timer is up!",
      icon: tomato,
      dir: "ltr",
    };
    const notification = new Notification("Tomato Timer", options);
    notification.onclick = (e) => {
      //window.open("https://marcotodaro.tk");
      window.focus();
    };
    setTimeout(notification.close.bind(notification), 7000); //scompare dallo schermo
  };

  useEffect(() => {
    //*ask for permission for desktop notification
    if (!isDone) {
      return;
    }
    if (Notification.permission === "granted") notify();
    else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "denied") {
          notify();
        }
      });
    }
  }, [isDone]);

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

  const timerReset = () => {
    setTime(timer * 60);
    setIsGoing(false);
    setIsDone(false);
  };

  return (
    <div className="myMainContainer bg-light rounded">
      {isDone ? (
        <Alert variant="danger" className="marginTop alert">
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
          <Button variant="secondary" onClick={timerReset}>
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

      {showInfo ? (
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
          <Button size="md" variant="info" onClick={() => setShowInfo(false)}>
            Hide Hints
          </Button>
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
      ) : (
        <Button
          size="lg"
          variant="info"
          style={{ marginBottom: "3vh" }}
          onClick={() => setShowInfo(true)}
        >
          Show Hints
        </Button>
      )}

      <KeyboardEventHandler
        handleKeys={["space", "alt+r"]}
        onKeyEvent={(key) => {
          if (key === "space") {
            setIsGoing(!isGoing);
          }
          if (key === "alt+r") {
            timerReset();
          }
        }}
      />
    </div>
  );
};

export default Main;
