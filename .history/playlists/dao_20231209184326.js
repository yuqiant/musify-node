import model from "./model.js";

export const findPlaylistById = (id) => model.find({ _id: id });
