import mongoose from "mongoose";

// 如果您的歌曲模式和播放列表在同一个数据库中，并且您想要在播放列表中引用歌曲，
// 您可以在这里使用 Mongoose 的 ref 来创建关联。
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
    songs: [{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'songs' // 假设您有一个 Song 模型并且想要创建关联

    }]
},
    {
        collection: "playlists"
    });

export default playlistSchema;
