import express, { Request, Response } from "express";

export const healthCheck = express.Router();

healthCheck.all("/", (req: Request, res: Response) => {
  return res.send("pong");
});

export const api = express.Router();

api.post("/message", (req: Request, res: Response) => {
  return res.send("message");
});
