import React, { useState, useContext } from 'react';
import { Container, Form, Row, Button, Alert } from 'react-bootstrap'

import { instance } from '../axiosconfig'
import MainContext from '../Context/MainContext'

const LoginPage = () => {

  const { logged, setLogged } = useContext(MainContext)
  const [err, setErr] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading] = useState(false);

  let submit = async (e) => {
    e.preventDefault()
    var data = JSON.stringify({ "username": `${email}`, "password": `${password}` });

    var config = {
      method: 'post',
      url: 'admin/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    instance(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data?.success) {
          setLogged(true)
        } else {
          setErr('Email or password incorrect')
          setLogged(false)
        }
      })
      .catch(function (error) {
        console.log(error)
        setLogged(false)
        setErr("Make sure backend is up")
      });

  }

  return (
    <div className="animate__animated animate__fadeIn d-flex align-items-center min-vh-100 py-3 py-md-0">
      <Container>
        <div className="card register-card">
          <Row className="no-gutters">
            <div className="col-md-7 register-img-card" />
            <div className="col-md-3">
              <Form className="card-body" onSubmit={submit}>
                <div className="title-holder">
                  <h3>Login</h3>
                </div>
                {err ? <Alert variant="warning">{err}</Alert> : null}
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="info" type="submit" >
                  {!isLoading ? "Login" : "Logging in..."}
                </Button>
              </Form>
            </div>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
