const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const DB = require('./database.js')


const authCookieName = 'token';
let users = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);



// Helper function to find a user based on a field and value
const findUser = (field, value) => {
    if (field === 'username') {
        return Object.values(users).find(user => user.username === value);
    }
    return null; // If the field is not 'username', return null
};

// Helper function to create a new user
const createUser = (username) => {
    const token = uuid.v4();
    users[username] = { username, token };
    return users[username];
};

// Helper function to set the authentication cookie
function setAuthCookie(res, token) {
    res.cookie(authCookieName, token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

// Create a new user (Sign up)
apiRouter.post('/auth/create', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send({ msg: 'Username is required' });
    }
    if (findUser('username', username)){
        return res.status(409).send({ msg: 'User already exists' });
    }
    const user = createUser(username);
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
});

// Log in an existing user
apiRouter.post('/auth/login', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send({ msg: 'Username is required' });
    }
    const user = findUser('username',username);
    if (user) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        return res.send({ username: user.username });
    }
    const newUser = createUser(username);
    setAuthCookie(res, newUser.token);
    return res.send({ username: newUser.username });
});

// Log out a user
apiRouter.delete('/auth/logout', (req, res) => {
    res.clearCookie(authCookieName);
    res.send({ msg:'Logged out' });
});

// Middleware to verify that the user is authorized to call an endpoint
app.get('/api/auth/check', (req,res) => {
    const token = req.cookies.auth;
    const user = Object.values(users).find(user => user.token === token);
    if (user) {
        return res.send({ username: user.username });
    }
    res.status(401).send({ msg:'Unauthorized' });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});