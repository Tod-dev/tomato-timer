import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Slider from "react-rangeslider";

import MyContext from "../MyContext";
import Alert from "react-bootstrap/Alert";

const Settings = (props) => {
  //! aggiungere settings : desktop notification e audio (on/off), settare volume audio, fare in modo che i dati rimangano al caricamento della pagina
  const { isGoing, show, onHide } = props;
  const { settings } = useContext(MyContext);
  const [data, setData] = useState(settings);

  const changeFormHandler = (event) => {
    if (event.target.id === "pomodoro") {
      setData({
        ...data,
        pomodoro: parseInt(event.target.value),
      });
    } else if (event.target.id === "shortBreak") {
      setData({
        ...data,
        shortBreak: parseInt(event.target.value),
      });
    } else {
      setData({
        ...data,
        longBreak: parseInt(event.target.value),
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mySettings">
        <h2> Timers </h2>
        <label htmlFor="pomodoro">Pomodoro Timer:</label>
        <input
          type="number"
          id="pomodoro"
          name="pomodoro"
          min="1"
          max="60"
          value={data.pomodoro || ""}
          onChange={changeFormHandler}
          className="ml-3 myInput"
        />
        <br />
        <label htmlFor="shortBreak">Short Break Timer:</label>
        <input
          type="number"
          id="shortBreak"
          name="shortBreak"
          min="1"
          max="60"
          value={data.shortBreak || ""}
          onChange={changeFormHandler}
          className="ml-3 myInput"
        />
        <br />
        <label htmlFor="longBreak">Long BreakTimer:</label>
        <input
          type="number"
          id="longBreak"
          name="longBreak"
          min="1"
          max="60"
          value={data.longBreak || ""}
          onChange={changeFormHandler}
          className="ml-3 myInput"
        />
        <h2 className="mt-3"> Audio & Desktop Notification </h2>

        <label htmlFor="desktopNotification" className="mr-3">
          Desktop Notification:
        </label>
        <BootstrapSwitchButton
          name="desktopNotification"
          checked={data.notification}
          onChange={() =>
            setData({ ...data, notification: !data.notification })
          }
          size="lg"
        />
        <br />
        <label htmlFor="audio" className="mr-3">
          Audio:
        </label>
        <BootstrapSwitchButton
          name="audio"
          checked={data.audio}
          onChange={() => setData({ ...data, audio: !data.audio })}
          size="lg"
        />
        <div className="slider">
          <label htmlFor="slider">Volume: {data.volume}% </label>
          <Slider
            name="slider"
            min={0}
            max={100}
            value={data.volume}
            onChange={(value) => setData({ ...data, volume: value })}
            style={{ color: "blue" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isGoing ? (
          <Alert variant="warning" size="sm">
            timer in corso! se salvi verrà resettato!
          </Alert>
        ) : null}
        <Button onClick={props.onHide.bind(this, data)}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Settings;
