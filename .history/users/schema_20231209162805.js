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
    enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
    default: "USER"
  },
  playlists: [playlistSchema]
},
  { collection: "users" });
export default userSchema;