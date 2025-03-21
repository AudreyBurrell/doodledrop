const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const DB = require('./database.js')

const authCookieName = 'token';
// let users = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json( { limit: '10mb' }));
app.use(express.urlencoded({ limit:'10mb', extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);


// Helper function to set the authentication cookie
function setAuthCookie(res, token) {
    res.cookie('token', token, { //used to be authCookieName
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

// Create a new user (Sign up)
apiRouter.post('/auth/create', async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send({ msg: 'Username is required' });
    }
    const existingUser = await DB.getUser(username);
    if (existingUser) {
        return res.status(409).send({ msg:'User already exists' });
    }
    const token = uuid.v4();
    const newUser = { username, token };
    await DB.createUser(newUser);
    setAuthCookie(res, token);
    res.send({ username: newUser.username });
});

// Log in an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send({ msg:'Username is required' });
    }
    const user = await DB.getUser(username);
    if (user) {
        user.token = uuid.v4();
        await DB.updateUser(user);
        setAuthCookie(res, user.token);
        return res.send({ username: user.username });
    }
    const newUser = {
        username,
        token: uuid.v4(),
    };
    await DB.createUser(newUser);
    setAuthCookie(res, newUser.token);
    return res.send({ username: newUser.username });
});

// Log out a user
apiRouter.delete('/auth/logout', async (req, res) => {
    res.clearCookie(authCookieName);
    res.send({ msg: 'Logged out' });
});

//api to get active users
apiRouter.get('/auth/active-users', async (req, res) => {
    const activeUsers = await DB.getActiveUsers();
    res.send({ activeUsers });
})

// Middleware to verify that the user is authorized to call an endpoint
app.get('/api/auth/check', async (req,res) => {
    const token = req.cookies.token;
    const user = await DB.getUserByToken(token);
    if (user) {
        return res.send({ username: user.username });
    }
    res.status(401).send({ msg:'unauthorized' });
    // const token = req.cookies.auth;
    // const user = await DB.getUserByToken(token);
    // if (user) {
    //     return res.send({ username: user.username });
    // }
    // res.status(401).send({ msg:'Unauthorized' });
});

//API to save an image (save to gallery)
apiRouter.post('/gallery/save', async (req, res) => {
    const { imageData, username } = req.body;
    if (!imageData || !username) {
        return res.status(400).json({ message:'Missing image data or username' });
    }
    const result = await DB.addImage(username, imageData);
    const message = JSON.stringify({
        type: 'new-image',
        username: username,
        imageData: imageData,
    });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
    res.status(200).send('Image saved successfully');
});
//api to get gallery images
apiRouter.get('/gallery', async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).send({ msg:'Username is required' });
    }
    const images = await DB.getGalleryImages(username);
    res.status(200).send(images);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});