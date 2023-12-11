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
// export const createUserPlaylist = async (userId, playlistData) => {
//   return model.findByIdAndUpdate(
//     userId,
//     { $push: { playlists: playlistData } },
//     { new: true }
//   );
// };
export const createUserPlaylist = async (userId, playlistData) => {
  try {
    // 找到相应的用户
    const user = await model.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newPlaylist = PlaylistModel.create(playlistData);
    // 添加到用户的播放列表中
    user.playlists.push(newPlaylist);

    // 保存更新后的用户文档
    await user.save();

    return newPlaylist;
  } catch (error) {
    throw error;
  }
};

