// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const songSchema = new Schema({
//   songName: String,
//   // Add other song properties (artistName, albumName, releasedYear, Genre) as needed
// });

// const playlistSchema = new Schema({
//   name: String,
//   songs: [songSchema], // Modify this line to include the songSchema directly
// });

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   firstName: String,
//   email: String,
//   lastName: String,
//   dob: Date,
//   role: {
//     type: String,
//     enum: ['DJ', 'ADMIN', 'USER'],
//     default: 'USER',
//   },
//   playlists: [playlistSchema],
// },
// { collection: 'users' });

// export default userSchema;


import mongoose from "mongoose";
const Schema = mongoose.Schema;
const playlistSchema = new mongoose.Schema({
  name: String,
  songs: [{ type: Schema.Types.ObjectId, ref: 'songs' }] // 假设您有一个 Song 模型
});
 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  email: String,
  lastName: String,
  dob: Date,
  role: {
    type: String,
    enum: ["REVIEWER", "ADMIN", "USER"],
    default: "USER"
  },
  playlists: [playlistSchema]
},
  { collection: "users" });
export default userSchema;