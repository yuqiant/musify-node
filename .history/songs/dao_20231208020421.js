import model from "./model.js";
export const findSongByName = (song) => model.find({ songName: song });
export const findSongByAlbum = (album) => model.find({ albumName: album })
export const findSongByArtist = (artist) => model.find({ artistName: artist })