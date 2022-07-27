import express, { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import exampleRoute from "./routes/exampleRoutes";
import mongoose from "mongoose";
import { DB, PORT } from "./config";
import { errorHandler } from "./middleware/errorHanlder";
import morgan from "morgan";
import cors from "cors";
const app = express();
app.use([express.json(), express.urlencoded({ extended: true }), cors()]);

app.use("/health", (req: any, res: any) => {
  res.status(200).json({ msg: "API is Live!!" });
});

app.use("/", exampleRoute);

app.use(() => {
  throw createHttpError(404, "Route not found");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening On PORT ${PORT}`);
});
