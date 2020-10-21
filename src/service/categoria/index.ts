import express from "express";

import routes from "./routes";

export default express.Router().use("/categoria", routes);
