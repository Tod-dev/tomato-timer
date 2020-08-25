import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Slider from "react-rangeslider";

import MyContext from "../MyContext";

const Settings = (props) => {
  //! aggiungere settings : desktop notification e audio (on/off), settare volume audio, fare in modo che i dati rimangano al caricamento della pagina
  const { settings } = useContext(MyContext);
  const [data, setData] = useState(settings);
  const [switchNotification, setSwitchNotification] = useState(
    settings.notification
  );
  const [switchAudio, setSwitchAudio] = useState(settings.audio.value);
  const [volume, setVolume] = useState(settings.audio.volume);

  useEffect(() => {
    setData((data) => {
      return {
        ...data,
        audio: { value: switchAudio, volume },
        notification: switchNotification,
      };
    });
  }, [switchAudio, volume, switchNotification]);

  const changeFormHandler = (event) => {
    if (event.target.value > 60) event.target.value = 60;
    if (event.target.value < 1) event.target.value = 1;
    if (event.target.id === "pomodoro") {
      setData({
        ...data,
        pomodoro: { ...data.pomodoro, value: parseInt(event.target.value) },
      });
    } else if (event.target.id === "shortBreak") {
      setData({
        ...data,
        shortBreak: { ...data.shortBreak, value: parseInt(event.target.value) },
      });
    } else {
      setData({
        ...data,
        longBreak: { ...data.longBreak, value: parseInt(event.target.value) },
      });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2> Timers </h2>
        <label htmlFor={data.pomodoro.name}>Pomodoro Timer:</label>
        <input
          type="number"
          id={data.pomodoro.name}
          name={data.pomodoro.name}
          min="1"
          max="60"
          value={data.pomodoro.value}
          onChange={changeFormHandler}
          className="ml-3 myInput"
        />
        <br />
        <label htmlFor={data.shortBreak.name}>Short Break Timer:</label>
        <input
          type="number"
          id={data.shortBreak.name}
          name={data.shortBreak.name}
          min="1"
          max="60"
          value={data.shortBreak.value}
          onChange={changeFormHandler}
          className="ml-3 myInput"
        />
        <br />
        <label htmlFor={data.longBreak.name}>Long BreakTimer:</label>
        <input
          type="number"
          id={data.longBreak.name}
          name={data.longBreak.name}
          min="1"
          max="60"
          value={data.longBreak.value}
          onChange={changeFormHandler}
          className="ml-3 myInput"
        />
        <h2 className="mt-3"> Audio & Desktop Notification </h2>

        <label htmlFor="desktopNotification" className="mr-3">
          Desktop Notification:
        </label>
        <BootstrapSwitchButton
          name="desktopNotification"
          checked={switchNotification}
          onChange={() => setSwitchNotification(!switchNotification)}
          size="lg"
        />
        <br />
        <label htmlFor="audio" className="mr-3">
          Audio:
        </label>
        <BootstrapSwitchButton
          name="audio"
          checked={switchAudio}
          onChange={() => setSwitchAudio(!switchAudio)}
          size="lg"
        />
        <div className="slider">
          <label htmlFor="slider">Volume: {volume}% </label>
          <Slider
            name="slider"
            min={0}
            max={100}
            value={volume}
            onChange={(value) => setVolume(value)}
            style={{ color: "blue" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide.bind(this, data)}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Settings;
