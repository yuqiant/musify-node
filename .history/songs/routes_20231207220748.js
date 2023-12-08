// import Database from "../Database/index.js"
import * as dao from "./dao.js";


function SongRoutes(app) {
    const findSongByName = async (req, res) => {
        const song = await dao.findSongByName(req.params.songName);
        res.json(song);
    };

    // 改用 GET 请求并接收路径参数
    app.get("/api/songs/:songName", findSongByName);
}

export default SongRoutes;