import model from "./model.js";
export const findSongByName = (song) => model.find({ songName: song });
export const findSongByAlbum = (album) => model.findOne({ albumName: album })