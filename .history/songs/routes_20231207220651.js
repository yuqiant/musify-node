// import Database from "../Database/index.js"
import * as dao from "./dao.js";


function SongRoutes(app) {


    const findSongByName = async (req, res) => {

        const song = await dao.findSongByName(req.params.songName);
        res.json(song);
    };

    app.post("/api/songs", findSongByName);


}

export default SongRoutes;