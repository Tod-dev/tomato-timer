import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import MyContext from "../../MyContext";
import "./Header.css";
import tomato from "../../images/tomato.png";

const Header = () => {
  const { settings, setSettings } = useContext(MyContext);
  //console.log(data);
  return (
    <Navbar bg="light" expand="md" className="myHeaderContainer rounded">
      <Navbar.Brand>

        <Image           
          alt="That's a tomato"
          src={tomato}
          style={{ width: 40, height: 40,marginRight: "2vw" }}
        />
      
        Tomato Timer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="justify-content-end extraMargin"
      >
        <Nav>
          <ButtonGroup size="lg" className="buttons">
            <Button
              variant="primary"
              className="pomodoroButton"
              onClick={() => setSettings({ ...settings, actual: "pomodoro" })}
            >
              Pomodoro
            </Button>
            <Button
              variant="warning"
              onClick={() => setSettings({ ...settings, actual: "shortBreak" })}
            >
              Short Break
            </Button>
            <Button
              variant="dark"
              onClick={() => setSettings({ ...settings, actual: "longBreak" })}
            >
              Long Break
            </Button>
          </ButtonGroup>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
