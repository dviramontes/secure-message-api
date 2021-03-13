import express from "express";
import bodyParser = require("body-parser");
import { api, healthCheck } from "./routes";

// eslint-disable-next-line
require("dotenv").config(); // load .env

const app: express.Express = express();

const PORT = process.env.PORT || 4000;

// middleware
app.use(bodyParser.json());
app.use("/ping", healthCheck);
app.use("/api", api);

app.listen(PORT);

console.log(`-- server running on ${PORT}`);

export default app;
