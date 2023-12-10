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
    albumName: String,
    releasedYear: String,
    Genre: String

},
    {
        collection: "songs"
    });

export default songSchema;
