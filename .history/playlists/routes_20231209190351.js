import * as dao from "./dao.js";

// function PlaylistRoutes(app) {


//     // 添加歌曲到播放列表的路由处理函数
//     app.post('/playlists/:playlistId/add-song', async (req, res) => {
//         const { playlistId } = req.params;
//         const { songId } = req.body; // 歌曲ID从请求体中获取

//         try {
//             // 找到播放列表
//             const playlist = await dao.findById(playlistId);

//             if (!playlist) {
//                 return res.status(404).send('Playlist not found');
//             }

//             if (!playlist.songs.includes(songId)) {
//                 playlist.songs.push(songId);
//                 await playlist.save(); // 保存更新后的播放列表
//                 res.status(200).send('Song added to the playlist');
//             } else {
//                 res.status(400).send('Song already in the playlist');
//             }
//         } catch (error) {
//             res.status(500).send('Error adding song to the playlist: ' + error.message);
//         }
//     });


// }
function PlaylistRoutes(app) {
    const addSongToPlaylist = async (req, res) => {
        const { playlistId } = req.params;
        const { songId } = req.body; // 歌曲ID从请求体中获取

        try {
            // 找到播放列表
            const playlist = await dao.findPlaylistById(playlistId);

            if (!playlist) {
                return res.status(404).send('Playlist not found');
            }

            if (!playlist.songs.includes(songId)) {
                playlist.songs.push(songId);
                await dao.savePlaylist(playlist); // 保存更新后的播放列表
                res.status(200).send('Song added to the playlist');
            } else {
                res.status(400).send('Song already in the playlist');
            }
        } catch (error) {
            res.status(500).send('Error adding song to the playlist: ' + error.message);
        }
    };





    app.post('/playlists/:playlistId/add-song', addSongToPlaylist);
}

export default PlaylistRoutes;
