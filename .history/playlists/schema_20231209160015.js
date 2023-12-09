import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 引用 User 模型
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }] // 引用 Song 模型
},
    { collection: "playlists" });

export default mongoose.model("Playlist", playlistSchema);