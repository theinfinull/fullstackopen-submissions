import morgan from "morgan";

morgan.token("json", (req) =>
  req.body ? JSON.stringify(req.body, null, 2) : "-"
);

export default morgan(
  ":method :url :status :res[content-length] - :response-time ms\nbody: :json"
);
