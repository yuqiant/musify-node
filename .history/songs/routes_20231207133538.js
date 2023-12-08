import Database from "../Database/index.js"

function SongRoutes(app) {

    app.get("/api/songs", (req, res) => {
        const { name } = req.query;
        if (!name) {
            res.status(400).send("Song name is required");
            return;
        }

        const songs = Database.songs
            .filter(song => song.name.toLowerCase() === name.toLowerCase());

        if (songs.length === 0) {
            res.status(404).send("No songs found with the given name");
            return;
        }

        res.send(songs);
    });


}

export default SongRoutes;