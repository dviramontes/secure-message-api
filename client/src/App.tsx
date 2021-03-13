import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./App.css";

interface IUsername {
  username: string;
}

interface IClipboard {
  text: string;
}

const Messages = () => {
  return (
    <div>
      <h4>Messages received</h4>
      <pre>timestamp -- message</pre>
    </div>
  );
};

const Clipboard = (props: IClipboard) => (
  <CopyToClipboard text={props.text}>
    <Button variant="info" size="sm" style={{ marginLeft: "0.5em" }}>
      <i className="fas fa-clipboard" />
    </Button>
  </CopyToClipboard>
);

const Username = (props: IUsername) => {
  const uuid = props.username || uuidv4();
  return (
    <div>
      <b>Username:</b> <code>{uuid}</code>
      <Clipboard text={uuid} />
    </div>
  );
};

const AccountButtons = () => {
  return (
    <div>
      <a href="">Create Account</a> / <a href="">Login</a> /{" "}
      <a href="">Logout</a>
    </div>
  );
};

function App() {
  const [userUUID, setUserUUID] = useState("");

  return (
    <div className="app">
      <div className="container">
        <div>
          <h3>
            Welcome to <u>Secure Messaging App</u> <br />
          </h3>
          <p>
            | <small>v0.0.1</small>
          </p>
          <p>
            A <em>proof of concept</em> App for sending and receiving messages
            anonymously and securely
          </p>
          <Username username={userUUID} />
          <AccountButtons />
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
