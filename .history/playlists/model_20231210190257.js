import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("playlists", schema);
export default model;