// import Database from "../Database/index.js"
import * as dao from "./dao.js";


function SongRoutes(app) {
    const findSongByName = async (req, res) => {
        const song = await dao.findSongByName(req.params.songName);
        res.json(song);
    };

    // 改用 GET 请求并接收路径参数
    app.get("/api/songs/:songName", findSongByName);
    app.get("/search", async (req, res) => {
        try {
            const { query, type } = req.query;

            // 这里的逻辑取决于 'type' 参数
            // 以及您如何想根据 'query' 参数搜索
            // 以下是一个简单的例子
            if (type === 'Songs') {
                const songs = await dao.findSongByName(query);
                console.log(songs)
                res.json(songs);
            } else {
                // 处理其他类型的搜索或返回错误
                res.status(400).send('Invalid type');
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });

}

export default SongRoutes;