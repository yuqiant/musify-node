import "dotenv/config";
import session from "express-session";
import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
mongoose.connect("mongodb://127.0.0.1:27017/musify");

// import "dotenv/config";
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
// mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  
app.use(express.json());

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
app.use(session(sessionOptions));


UserRoutes(app);
app.listen(process.env.PORT || 4000);

