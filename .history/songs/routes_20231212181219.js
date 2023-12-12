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

    app.post('/api/songs', async (req, res) => {
        try {
            const newSong = await dao.addSong(req.body);
            res.status(201).json(newSong);
        } catch (error) {
            res.status(500).send('Error adding song: ' + error.message);
        }
    });

    app.post('/api/songs', async (req, res) => {
        try {
            const newSong = await dao.addSong(req.body);
            res.status(201).json(newSong);
        } catch (error) {
            res.status(500).send('Error adding song: ' + error.message);
        }
    });

    app.get('/api/songs', async (req, res) => {
        try {
            const songs = await dao.findAllSongs();
            res.json(songs);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });

    app.put('/api/songs/:id', async (req, res) => {
        try {
            const songId = req.params.id;
            const updatedSong = await dao.updateSong(songId, req.body);
            if (updatedSong) {
                res.json(updatedSong);
            } else {
                res.status(404).send('Song not found');
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });

    app.delete('/api/songs/:id', async (req, res) => {
        try {
            const songId = req.params.id;
            await dao.deleteSong(songId);
            res.status(200).send('Song deleted successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });

    const findSongByIdHandler = async (req, res) => {
        try {
            const songId = req.params.id;
            const song = await dao.findSongById(songId);
            if (song) {
                res.json(song);
            } else {
                res.status(404).send('Song not found');
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    };
    app.get("/details/:id", findSongByIdHandler);



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
            } else if (type == "Artists") {
                const artists = await dao.findSongByArtist(query)
                console.log(artists)
                res.json(artists)
            }


            else {
                res.status(400).send('Invalid type');
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }


    );
}

export default SongRoutes;