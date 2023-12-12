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

export const removePlaylistFromAllUsers = async (playlistId) => {
  try {
    console.log('Attempting to remove playlist from all users:', playlistId);
    await model.updateMany(
      {}, // 空的查询条件表示更新所有文档
      { $pull: { playlists: playlistId } }
    );
  } catch (error) {
    console.error('Error removing playlist from users:', error);

    throw error;
  }
  // try {
  //   console.log('Attempting to remove playlist from user:', userId);
  //   await model.updateOne(
  //     { _id: userId }, // 指定要更新的用户
  //     { $pull: { playlists: { _id: playlistId } } } // 从该用户的 playlists 中移除指定的播放列表
  //   );
  // } catch (error) {
  //   console.error('Error removing playlist from user:', userId, error);
  //   throw error;
  // }
};

