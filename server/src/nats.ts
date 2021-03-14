import * as n from "nats";

export const natsConnect = () => n.connect("nats://0.0.0.0:4222");

export const accessGranted = JSON.stringify({
  result: { get: true, call: "*" },
});

export const errorNotFound = JSON.stringify({
  error: { code: "system.notFound", message: "Not found" },
});

export const successResponse = JSON.stringify({ result: null });

export const errorInvalidParams = (message: string) =>
  JSON.stringify({ error: { code: "system.invalidParams", message } });
