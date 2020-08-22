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
  const { setTimer, data } = useContext(MyContext);
  //console.log(data);
  return (
    <Navbar bg="light" expand="md" className="myHeaderContainer rounded">
      <Navbar.Brand href="#home">
        <img
          alt="That's a tomato"
          src={tomato}
          style={{ width: 30, height: 30 }}
          className="d-inline-block align-top"
        />{" "}
        <Image />
        {"  "}
        Tomato Timer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="justify-content-end extraMargin"
      >
        <Nav>
          <ButtonGroup size="lg" className="buttons">
            <Button variant="primary" onClick={() => setTimer(data.pomodoro)}>
              Pomodoro
            </Button>
            <Button variant="warning" onClick={() => setTimer(data.shortBreak)}>
              Short Break
            </Button>
            <Button variant="dark" onClick={() => setTimer(data.longBreak)}>
              Long Break
            </Button>
          </ButtonGroup>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
