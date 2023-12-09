import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import SongRoutes from "./songs/routes.js";
import UserRoutes from "./users/routes.js";
import "dotenv/config";
import session from "express-session";

const app = express();
const port = 4000;

// mongoose.connect(CONNECTION_STRING);
mongoose.connect("mongodb://127.0.0.1:27017/musify");

// app.use(cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL
// }));
app.use(express.json())
app.use(cors());

// @@ FRANK
// app.use(cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   }));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  app.use(
    session(sessionOptions)
  );
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions))

SongRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000);