import "dotenv/config";
import session from "express-session";
import express from 'express';
import cors from "cors";
import SongRoutes from "./songs/routes.js";
import UserRoutes from "./users/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import PlaylistRoutes from "./playlists/routes.js";

const app = express();
const port = 4000;

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/musify';

// mongoose.connect(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);
// mongoose.connect('mongodb://127.0.0.1:27017/musify')

// app.use(cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL
// }));
app.use(express.json())
// @@ YQ
// app.use(cors());

// const corsOptions = {
//   origin: 'http://localhost:3000', // or the specific origin you want to allow
//   credentials: true, // to allow cookies and sessions
// };
// app.use(cors(corsOptions));

// @@ FRANK
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

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
PlaylistRoutes(app);

app.listen(process.env.PORT || 4000);

// import "dotenv/config";
// import session from "express-session";
// import express from 'express';
// import cors from "cors";
// import SongRoutes from "./songs/routes.js";
// import UserRoutes from "./users/routes.js";
// import mongoose from "mongoose";
// import PlaylistRoutes from "./playlists/routes.js";

// const app = express();
// const port = process.env.PORT || 4000;

// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/musify';

// mongoose.connect(CONNECTION_STRING);

// app.use(express.json());

// // Configure CORS
// const corsOptions = {
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };
// app.use(cors(corsOptions));

// const sessionOptions = {
//   secret: "any string",
//   resave: false,
//   saveUninitialized: false,
// };

// if (process.env.NODE_ENV !== "development") {
//   sessionOptions.proxy = true;
//   sessionOptions.cookie = {
//     sameSite: "none",
//     secure: true,
//   };
// }

// app.use(session(sessionOptions));

// SongRoutes(app);
// UserRoutes(app);
// PlaylistRoutes(app);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
