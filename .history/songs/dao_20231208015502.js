import model from "./model.js";
export const findSongByName = (song) => model.findOne({ songName: song });
export const findSongByAlbum = (album) => model.findOne({ albumName: album })