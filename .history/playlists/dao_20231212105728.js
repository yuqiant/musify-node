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

