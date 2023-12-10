import mongoose from 'mongoose';

const { Schema } = mongoose;

const songSchema = new Schema({
  songName: String,
  // Add other song properties (artistName, albumName, releasedYear, Genre) as needed
});

const playlistSchema = new Schema({
  name: String,
  songs: [songSchema], // Modify this line to include the songSchema directly
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  email: String,
  lastName: String,
  dob: Date,
  role: {
    type: String,
    enum: ['DJ', 'ADMIN', 'USER'],
    default: 'USER',
  },
  playlists: [playlistSchema],
},
{ collection: 'users' });

export default userSchema;
