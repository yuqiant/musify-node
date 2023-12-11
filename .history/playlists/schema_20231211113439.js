import mongoose from "mongoose";


const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    description: {
        type: String,
        required: true
    },
    songs: [{

        _id: mongoose.Schema.Types.ObjectId,
        songName: String
    }]
},
    {
        collection: "playlists"
    });

export default playlistSchema;
