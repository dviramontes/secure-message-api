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

// Access listener for all library resources. Everyone gets full access
nats.subscribe("access.example.>", (req: any, reply: any) => {
  nats.publish(reply, accessGranted);
});

nats.subscribe("get.example.model", (reply: any) => {
  nats.publish(
    reply,
    JSON.stringify({ result: { model: { message: "Hello, World!" } } })
  );
});

nats.subscribe("access.example.model", (req: any, reply: any) => {
  nats.publish(reply, JSON.stringify({ result: { get: true } }));
});

nats.publish("system.reset", JSON.stringify({ resources: ["example.>"] }));

app.listen(PORT);

console.log(`-- server running on ${PORT}`);

export default app;
