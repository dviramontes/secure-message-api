import express from "express";
import bodyParser = require("body-parser");
import { api, healthCheck } from "./routes";
import { accessGranted, natsConnect } from "./nats";

// eslint-disable-next-line
require("dotenv").config(); // load .env

const app: express.Express = express();

const PORT = process.env.PORT || 4000;

// middleware
app.use(bodyParser.json());
app.use("/ping", healthCheck);
app.use("/api", api);

const nats = natsConnect();

const mymodel = { message: "Hello NATS" };

// Listen to RES get requests over NATS
nats.subscribe('get.models.mymodel', function(req:any, reply:any) {
  nats.publish(reply, JSON.stringify({ result: { model: mymodel }}));
});

nats.subscribe("auth.sessions.login", function (req: any, reply: any) {
  const { cid, params, token } = JSON.parse(req);
  console.log({cid});
  console.log({params});
  console.log({token});
  // If client already has an access token, respond with an error
  // if (token) {
  //   nats.publish(reply, JSON.stringify({ error:
  //       { code: 'session.alreadyLoggedIn', message: "Already logged in" }
  //   }));
  //   return;
  // }
  nats.publish(reply, JSON.stringify({ result: { data: [1234] }}));
})

nats.subscribe('access.models.>', function(req: any, reply:any) {
  let { token } = JSON.parse(req);
  console.log({token});
  nats.publish(reply, JSON.stringify({ result: {
      get: true // Or false, if the token doesn't provide access
    }}));
});

// Updating the model
mymodel.message = "Hello NATS+Resgate";
nats.publish('event.models.mymodel.change', JSON.stringify({
  values: { message: mymodel.message }
}));

app.listen(PORT);

console.log(`-- server running on ${PORT}`);

export default app;
