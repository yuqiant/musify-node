import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    albumName: String
    albumName: String
},
    {
        collection: "songs"
    });

export default songSchema;
