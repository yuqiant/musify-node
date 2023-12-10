import model from "./model.js";

// export const findPlaylistById = (id) => model.find({ _id: id });
export const findPlaylistById = (id) => model.findById(id);
export const updatePlaylistById = async (id, updateData) => {
    return await model.findByIdAndUpdate(id, updateData, { new: true });
};