import * as dao from "./dao.js";

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

    app.get('/playlists/:playlistId', getPlaylistDetails);

    app.post('/playlists/:playlistId/add-song', addSongToPlaylist);
}

export default PlaylistRoutes;
