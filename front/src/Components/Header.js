import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import MainContext from '../Context/MainContext';

const Header = () => {

  const [scroll, setScroll] = useState(0)
  const { logged, setLogged } = useContext(MainContext)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 20);
    });
  }, []);

  return (
    <>
      <Container fluid>
        <Navbar expand='lg' variant="dark" className={scroll ? "fixed-top black-nav" : "fixed-top"}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav className="ml-auto" navbar>
            <Nav.Link onClick={() => setLogged(false) } as={Link} to="/">Logout</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </>
  );
}

export default Header;
