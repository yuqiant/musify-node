import * as dao from "./dao.js";

function PlaylistRoutes(app) {
    // const addSongToPlaylist = async (req, res) => {
    //     const { playlistId } = req.params;
    //     const { songId } = req.body; // 歌曲ID从请求体中获取


    //     try {

    //         const playlist = await dao.findPlaylistById(playlistId);
    //         console.log("playlist now", playlist)

    //         if (!playlist) {
    //             return res.status(404).send('Playlist not found');
    //         }

    //         if (!playlist.songs.includes(songId)) {
    //             playlist.songs.push(songId);
    //             await dao.savePlaylist(playlist); // 保存更新后的播放列表
    //             res.status(200).send('Song added to the playlist');
    //         } else {
    //             res.status(400).send('Song already in the playlist');
    //         }
    //     } catch (error) {
    //         console.log("backend playlist id", playlistId);
    //         console.log("backend song id:", songId);
    //         res.status(500).send('Error adding song to the playlist: ' + error.message);
    //     }
    // };
    const addSongToPlaylist = async (req, res) => {
        const { playlistId } = req.params;
        const { songId } = req.body; // 歌曲ID从请求体中获取

        try {
            const playlist = await dao.findPlaylistById(playlistId);
            console.log("playlist now", playlist);

            // If playlist is not found, return a 404 error
            if (!playlist) {
                return res.status(404).send('Playlist not found');
            }

            // Initialize songs array if it's not present
            if (!playlist.songs) {
                playlist.songs = [];
            }

            // Check if the song is already in the playlist
            if (!playlist.songs.includes(songId)) {
                playlist.songs.push(songId);
                await playlist.save(); // Save the updated playlist
                res.status(200).send('Song added to the playlist');
            } else {
                res.status(400).send('Song already in the playlist');
            }
        } catch (error) {
            console.error('Error adding song to the playlist:', error);
            res.status(500).send('Error adding song to the playlist: ' + error.message);
        }
    };
};



app.post('/playlists/:playlistId/add-song', addSongToPlaylist);
}

export default PlaylistRoutes;
