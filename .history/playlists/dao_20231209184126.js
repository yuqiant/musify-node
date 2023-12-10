import model from "./model.js";

export const findPlaylistByName = (song) => model.find({ songName: song });
