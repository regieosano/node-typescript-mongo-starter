import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.Promise = Promise;
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}${process.env.MONGO_DB_CLUSTER_STRING}`
);
mongoose.connection.on("error", (error: Error) => console.error(error));

const app = express();

const PORT = process.env.PORT || process.env.SERVER_PORT;

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
