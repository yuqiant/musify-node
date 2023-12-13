import * as dao from "./dao.js";
import * as PlaylistModel from "../playlists/dao.js"

function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
  };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const currentUser = await dao.findUserByCredentials(username, password);
      if (currentUser) {
        // Exclude password before storing user in the session
        const userWithoutPassword = { ...currentUser._doc, password: undefined };
        req.session['currentUser'] = userWithoutPassword;
        res.json(userWithoutPassword);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred while signing in" });
    }
  };

  const signout = (req, res) => {
    if (req.session['currentUser']) {
      req.session.destroy(err => {
        if (err) {
          res.status(500).json({ message: "Error signing out" });
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      res.status(400).json({ message: "No user currently signed in" });
    }
  };

  const account = async (req, res) => {
    if (req.session['currentUser']) {
      res.json(req.session['currentUser']);
    } else {
      res.status(401).json({ message: "No active session" });
    }
  };

  const findUserPlaylists = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await dao.findUserById(userId);
      console.log("backend user", user);
      console.log("backend userid", userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user.playlists);
    } catch (error) {
      res.status(500).send('Error fetching playlists: ' + error.message);
    }
  };


  app.post("/api/users/:userId/playlists", async (req, res) => {
    const { userId } = req.params;
    const playlistData = req.body;
    console.log('Received playlist data:', req.body);
    console.log("playlist id posting:", playlistData._id);

    // try {
    //   const newPlaylist = await dao.createUserPlaylist(userId, playlistData);
    //   console.log("2: now creating", newPlaylist);
    //   res.status(201).json(newPlaylist);
    // } catch (error) {
    //   console.log("playlist here", playlistData);
    //   res.status(500).send('Error creating playlist: ' + error.message);
    // }

    // now trying to fix the duplicate prob
    try {
      const user = await dao.findUserById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }


      let newPlaylist = await PlaylistModel.findPlaylistById(
        playlistData._id
      );


      if (!newPlaylist) {
        // 如果没有找到，创建新的播放列表
        newPlaylist = await PlaylistModel.createPlaylist({
          userId: userId,
          name: playlistData.name,
          description: playlistData.description,
          songs: []
        });
        const playlistInfo = {
          _id: newPlaylist._id, // 或 newPlaylist.id
          name: newPlaylist.name,
          songs: newPlaylist.songs
        };

        // 将新对象添加到用户的播放列表数组中
        user.playlists.push(playlistInfo);
        await user.save();
      } else {
        // 如果找到已存在的播放列表，确保它已经在用户的 playlists 数组中
        if (!user.playlists.some(p => p._id.equals(newPlaylist._id))) {
          user.playlists.push(newPlaylist);
          await user.save();
        }
      }

      console.log("2: now creating", newPlaylist);
      res.status(201).json(newPlaylist);
    } catch (error) {
      console.error('Error creating playlist:', error);
      res.status(500).send('Error creating playlist: ' + error.message);
    }

  });



  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", account);
  app.get("/users/:userId/playlists", findUserPlaylists);

}
export default UserRoutes;