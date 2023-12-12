import model from "./model.js";

// export const findPlaylistById = (id) => model.find({ _id: id });
export const findPlaylistById = (id) => model.findById(id);
export const updatePlaylistById = async (id, updateData) => {
    return await model.findByIdAndUpdate(id, updateData, { new: true });
};

export const createPlaylist = async (playlistData) => {
    return model.create(playlistData);
};

export const deletePlaylist = async (playlistId) => {
    return await model.findByIdAndDelete(playlistId);
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
};