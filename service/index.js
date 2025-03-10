const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
app.use(express.static('public'));

const authCookieName = 'token';
let users = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

var apiRouter = express.Router();
app.use('/api', apiRouter);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to the DoodleDrop API!');
});

// Helper function to find a user based on a field and value
const findUser = (field, value) => {
    return users.find(user => user[field] === value);
};

// Helper function to create a new user
const createUser = (username) => {
    const newUser = {
        username,
        id: uuid.v4(),
    };
    users.push(newUser);
    return newUser;
};

// Helper function to set the authentication cookie
const setAuthCookie = (res, token) => {
    res.cookie(authCookieName, token, { httpOnly: true });
};

// Create a new user (Sign up)
apiRouter.post('/auth/create', (req, res) => {
    if (findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = createUser(req.body.username);
        const sessionToken = uuid.v4();
        user.token = sessionToken;
        setAuthCookie(res, sessionToken);
        res.send({ username: user.username });
    }
});

// Log in an existing user
apiRouter.post('/auth/login', (req, res) => {
    const user = findUser('username', req.body.username);
    if (!user) {
        user = createUser(req.body.username);
    }
    const sessionToken = uuid.v4();
    user.token = sessionToken.Token;
    setAuthCookie(res, sessionToken);
    res.send ({ username: user.username });
});

// Log out a user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = (req, res, next) => {
    const user = findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.get('/auth/status', (req, res) => {
    const user = findUser('token', req.cookies[authCookieName]);
    if (user) {
        res.send({ msg:'User is authenticated', username: user.username });
    } else {
        res.status(401).send({ msg:'User is not authenticated' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});