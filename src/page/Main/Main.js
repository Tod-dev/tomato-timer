import React, { useState, useEffect, useContext, useCallback } from "react";
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
import settingsImage from "../../images/settings.png";
import tomato from "../../images/tomato.png";
//import buzz from "../../audios/buzz.mp3";
import Settings from "../../components/Settings";
import ENV from "../../env";


const Main = () => {
  const { settings, setSettings } = useContext(MyContext);

  useEffect(() => {
    setTime(settings[settings.actual] * 60);
  }, [settings]);

  const [time, setTime] = useState(settings[settings.actual] * 60);
  const [isGoing, setIsGoing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [canNotify, setCanNotify] = useState(true);

  // useEffect(() => {
  //   //only run 1 time at the first time
  //   if (!("Notification" in window)) {
  //     console.log("This browser does not support desktop notification");
  //   } else {
  //     if (Notification.permission === "default") {
  //       Notification.requestPermission();
  //     }
  //   }
  // }, []);

  const notify = useCallback(() => {
    //DESKTOP NOTIFICATION
    if (!settings.notification) {
      return;
    }
    if (!canNotify) {
      return;
    }
    const options = {
      body: "Your Timer is up!",
      icon: tomato,
      dir: "ltr",
    };
    const notification = new Notification("Tomato Timer", options);
    notification.onclick = (e) => {
      //window.open("https://marcotodaro.tk", "_blank");
      window.focus();
    };
    setTimeout(notification.close.bind(notification), 7000); //scompare dallo schermo
    setCanNotify(false);
  }, [settings.notification, canNotify]);

  const playAudio = useCallback(() => {
    if (!settings.audio) {
      return;
    }
    //settare volume

    const audio = document.querySelector(".audio");
    audio.currentTime = 0;
    audio.volume = settings.volume / 100;
    audio.play();
  }, [settings.audio, settings.volume]);

  useEffect(() => {
    //*ask for permission for desktop notification
    if (!isDone) {
      return;
    }
    playAudio();
    if ('Notification' in window){
    if (Notification.permission === "granted") notify();
    }
  }, [isDone, playAudio, notify]);

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
    setTime(settings[settings.actual] * 60);
    setIsGoing(false);
    setIsDone(false);
    setCanNotify(true);
  };

  const check = (value,type) => {
    if (!value) {
      value = ENV.settings[type];
    }
    if (value > 60) {
      value = 60;
    }
    if(value < 1){
      value = 1;
    }
    return value;
  };

  const onHideForm = (data) => {
    //save data
     //console.log(data);
    if (!data) return setShowSettings(false);
    //check data
    data.pomodoro = check(data.pomodoro,"pomodoro");
    data.shortBreak = check(data.shortBreak,"shortBreak");
    data.longBreak = check(data.longBreak,"longBreak");
    timerReset();
    const newSettings = {
      pomodoro: data.pomodoro ,
      shortBreak: data.shortBreak ,
      longBreak: data.longBreak,
      audio: data.audio,
      volume: data.volume,
      notification: data.notification,
      actual: data.actual,
    };
    //console.log(newSettings);
    setSettings(newSettings);
    setShowSettings(false);
  };

  return (
    <div className="myMainContainer bg-light rounded">
      <Settings isGoing={isGoing} show={showSettings} onHide={onHideForm} />

      {isDone ? (
        <Alert variant="danger" className="marginTop alert">
          Pomodoro Timer ended!
        </Alert>
      ) : null}
      <ButtonToolbar
        aria-label="Toolbar with button groups"
        className="buttonContainer marginTop"
      >
        <ButtonGroup size="lg" className="myButtonGroup">
          <Button
            variant="success"
            onClick={() => {
              if (time === 0) {
                return;
              }
              if (!("Notification" in window)) {
                console.log(
                  "This browser does not support desktop notification"
                );
              } else {
                if (Notification.permission === "default") {
                  Notification.requestPermission();
                }
              }

              if (time > 0) {
                setIsGoing(true);
                setIsDone(false);
              }
            }}
          >
            Start
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (time === 0) {
                return;
              }
              setIsGoing(false);
            }}
          >
            Stop
          </Button>
          <Button variant="secondary" onClick={timerReset}>
            Reset
          </Button>
        </ButtonGroup>
        <ButtonGroup size="lg" className="myButtonGroup">
          <Button variant="info" onClick={() => setShowSettings(true)}>
            <Image
              src={settingsImage}
              alt="settings"
              style={{ width: 30, height: 30 }}
            />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
          <p className="title">{settings.actual === "pomodoro" ? "Pomodoro" : settings.actual === "shortBreak" ? "Short Break" : "Long Break"} timer:</p>
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
