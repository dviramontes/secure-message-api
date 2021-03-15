import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuid4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IApp, IClipboard, ICreds } from "./types";
import { AES, enc } from "crypto-js";
import { times, random } from "lodash";
import "./App.css";

const generatePassword = (length: number): string => {
  return times(length, () => random(35).toString(36)).join("");
};

const encrypt = (message: string, password: string): string => {
  return AES.encrypt(message, password).toString();
};

const decrypt = (message: string, password: string): string => {
  const bytes = AES.decrypt(message, password);
  return bytes.toString(enc.Utf8);
};

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

const UserCredentials = ({ username, password }: ICreds) => (
  <ul>
    <li>
      <b>Username:</b> <code>{username}</code>
      <Clipboard text={username} /> <br />
    </li>
    <li>
      <b>Password:</b> <code>{password}</code>
      <Clipboard text={password} />
    </li>
  </ul>
);

const AccountButtons = () => {
  return (
    <div>
      <a href="/">Create Account</a> / <a href="/">Login</a> /{" "}
      <a href="/">Logout</a>
    </div>
  );
};

function App(props: IApp) {
  const [username, setUsername] = useState(uuid4());
  const [password, setPassword] = useState(generatePassword(12));
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("got here 0");

    props.client.get("messages.model").then((model: any) => {
      console.log(model.message);

      let onChange = () => {
        console.log("New message: " + model.message);
      };

      // Listen to changes for 5 seconds, eventually unsubscribing
      model.on("change", onChange);
      // setTimeout(() => {
      //   model.off("change", onChange);
      // }, 5000);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("leave", () => alert("leaving"));
  });

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
          <UserCredentials username={username} password={password} />
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
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="contents"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
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
