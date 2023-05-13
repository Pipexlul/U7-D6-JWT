import { timelog } from "../utils/logUtils.js";

const logCalls =
  ({ hideIp = false } = {}) =>
  (req, res, next) => {
    timelog(req.method, req.path, !hideIp ? `from ${req.ip}` : "");

    next();
  };

export default logCalls;
