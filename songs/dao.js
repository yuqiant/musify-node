import model from "./model.js";

export const findSongByName = (song) => model.find({ songName: song });
export const findSongByAlbum = (album) => model.find({ albumName: album })
export const findSongByArtist = (artist) => model.find({ artistName: artist })
export const findSongByPlaylist = (playlist) => model.find({ playlistName: playlist })
export const findSongById = (id) => model.findById(id);
export const addSong = async (songData) => {
  const song = new model(songData);
  return await song.save();
};
export const findAllSongs = async () => {
  return await model.find();
};
export const updateSong = async (songId, songData) => {
  return await model.findByIdAndUpdate(songId, songData, { new: true });
};
export const deleteSong = async (songId) => {
  return await model.findByIdAndDelete(songId);
};