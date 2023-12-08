import model from "./model.js";
export const findSongByName = (song) => model.findOne({ songName: song });
