import model from "./model.js";
import UserModel from "../users/model.js"

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
// export const createUserPlaylist = async (userId, playlistData) => {
//   return model.findByIdAndUpdate(
//     userId,
//     { $push: { playlists: playlistData } },
//     { new: true }
//   );
// };
export const createUserPlaylist = async (userId, playlistData) => {
  const newPlaylist = await model.create(playlistData);
  await UserModel.findByIdAndUpdate(userId, {
    $push: { playlists: newPlaylist._id }
  });
  return newPlaylist;
};
