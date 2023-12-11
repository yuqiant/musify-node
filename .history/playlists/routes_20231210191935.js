import * as dao from "./dao.js";
import * as UserDao from "../users/dao.js";

import { findSongById } from '../songs/dao.js';

function PlaylistRoutes(app) {

    const addSongToPlaylist = async (req, res) => {
        const { playlistId } = req.params;
        const { songId } = req.body;

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
            // try to add sonag name and song id to the playlist
            const song = await findSongById(songId);
            if (!song) {
                return res.status(404).send('Song not found');
            }

            const songExists = playlist.songs.some(existingSong => existingSong._id.equals(songId));
            if (!songExists) {
                // Add the song details to the playlist
                playlist.songs.push({ _id: song._id, songName: song.songName });
                await playlist.save();
                res.status(200).send('Song added to the playlist');
            } else {
                res.status(400).send('Song already in the playlist');
            }

        } catch (error) {
            console.error('Error adding song to the playlist:', error);
            res.status(500).send('Error adding song to the playlist: ' + error.message);
        }
    };

    // populate the song
    const getPlaylistDetails = async (req, res) => {
        const { playlistId } = req.params;

        try {
            const playlist = await dao.findPlaylistById(playlistId).populate('songs');
            if (!playlist) {
                return res.status(404).send('Playlist not found');
            }

            res.json(playlist);
        } catch (error) {
            console.error('Error fetching playlist details:', error);
            res.status(500).send('Internal Server Error');
        }
    };

    const deleteSongFromPlaylist = async (req, res) => {
        const { playlistId, songId } = req.params;

        try {
            const playlist = await dao.findPlaylistById(playlistId);
            if (!playlist) {
                return res.status(404).send('Playlist not found');
            }

            // 移除指定的歌曲
            playlist.songs = playlist.songs.filter(song => !song._id.equals(songId));
            await playlist.save();

            res.status(200).send('Song removed from playlist');
        } catch (error) {
            console.error('Error removing song from playlist:', error);
            res.status(500).send('Error removing song from playlist: ' + error.message);
        }
    };

    // update the playlist
    app.put('/playlists/:playlistId', async (req, res) => {
        const { playlistId } = req.params;
        const { name, description } = req.body;

        try {
            const updatedPlaylist = await dao.updatePlaylistById(playlistId, { name, description });
            if (!updatedPlaylist) {
                return res.status(404).send('Playlist not found');
            }
            res.status(200).json(updatedPlaylist);
        } catch (error) {
            console.error('Error updating playlist:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    const createPlaylist = async (req, res) => {
        const { name, description, userId } = req.body;

        try {
            // 创建新的播放列表对象
            const newPlaylist = await dao.createPlaylist({
                name,
                description,
                userId, // 确保您的数据库模型支持这个字段
                songs: [] // 初始化空的歌曲数组
            });

            // 保存播放列表
            const savedPlaylist = await newPlaylist.save();

            res.status(201).json(savedPlaylist);
        } catch (error) {
            console.error('Error creating new playlist:', error);
            res.status(500).send('Error creating new playlist: ' + error.message);
        }
    };





    app.post('/playlists', createPlaylist);
    app.get('/playlists/:playlistId', getPlaylistDetails);
    app.post('/playlists/:playlistId/add-song', addSongToPlaylist);
    app.delete('/playlists/:playlistId/songs/:songId', deleteSongFromPlaylist);

}

export default PlaylistRoutes;
