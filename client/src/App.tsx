import React from "react";
import { Form, Button } from "react-bootstrap";
import "./App.css";

const Messages = () => {
  return (
    <div>
      <h4>Messages received</h4>
      <pre>timestampt -- message</pre>
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <div className="container">
        <div>
          <h3>
            Welcome to <u>Secure Messaging App</u> <br />
          </h3>
          <p>|{" "}<small>v0.0.1</small></p>
          <p>
            A <em>proof of concept</em> App for sending and receiving messages
            anonymously and securely
          </p>
          Username: <code>uuid-1234-abcd</code> <br />
          <a href="">Create Account</a> / <a href="">Login</a> /{" "}
          <a href="">Logout</a>
          <div className="section">
            <Messages />
          </div>
          <div className="section">
            <h4>Compose new message</h4>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Recipient</Form.Label>
                <Form.Control type="text" placeholder="user-uuid" />
              </Form.Group>
              <p>Message</p>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={3} placeholder="contents" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;