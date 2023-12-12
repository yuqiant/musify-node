import model from "./model.js";
import PlaylistModel from "../playlists/model.js"

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


export const createUserPlaylist = async (userId, playlistData) => {
  try {
    const user = await model.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newPlaylist = await PlaylistModel.create(playlistData);
    user.playlists.push(newPlaylist);
    await user.save();

    return newPlaylist;
  } catch (error) {
    throw error;
  }
};

