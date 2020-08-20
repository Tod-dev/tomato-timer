import React from "react";

import "./Navigator.css";
import tomato from "../../images/tomato.png";

import { Navbar, Nav, Image, Button, ButtonGroup } from "react-bootstrap";

const Navigator = () => {
  return (
    <Navbar bg="light" expand="md" className="myNavBar rounded">
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
          <ButtonGroup size="lg">
            <Button variant="danger">Pomodoro</Button>
            <Button variant="warning">Short Break</Button>
            <Button variant="dark">Long Break</Button>
          </ButtonGroup>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigator;
