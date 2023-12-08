// import Database from "../Database/index.js"
import * as dao from "./dao.js";


function SongRoutes(app) {
    const findSongByName = async (req, res) => {
        const song = await dao.findSongByName(req.params.songName);
        res.json(song);
    };

    const findSongByAlbum = async (req, res) => {
        const album = await dao.findSongByAlbum(req.params.albumName)
        res.json(album);
    }

    const findSongByArtist = async (req, res) => {
        const artist = await dao.findSongByArtist(req.params.artistName)
        res.json(artist)
    }


    // app.get("/api/songs/:songName", findSongByName);
    app.get("/search", async (req, res) => {
        try {
            const { query, type } = req.query;
            if (type === 'Songs') {
                const songs = await dao.findSongByName(query);
                console.log(songs)
                res.json(songs);
            } else if (type == "Albums") {
                const albums = await dao.findSongByAlbum(query)
                console.log(albums)
                res.json(albums)
            } else if (type == "Playlists") {
                const playlists = await dao.findSongByPlaylist(query)
                console.log(playlists)
                res.json(playlists)
            }


            else {
                // 处理其他类型的搜索或返回错误
                res.status(400).send('Invalid type');
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });




}

export default SongRoutes;