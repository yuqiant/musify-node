import mongoose from "mongoose";


const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users' // 假设您有一个 User 模型
    },
    description: {
        type: String,
        required: true
    },
    songs: [{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'songs' // 假设您有一个 Song 模型并且想要创建关联
        _id: mongoose.Schema.Types.ObjectId,
        songName: String
    }]
},
    {
        collection: "playlists"
    });

export default playlistSchema;
