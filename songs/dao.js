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

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });