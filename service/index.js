const cookieParser = require('cookie-parser');
// const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const isAuthenticated = require('./middleware/authMiddleware')
const authCookieName = 'token';

let users=[];
let drawings=[];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const port = process.argv.length > 2 ? process.argv[2] : 4000; //used to be 3000

var apiRouter = express.Router();

//Create a new user
apiRouter.post('/auth/create', async (req, res) => {
    const { username } = req.body;
    if (!username || username.trim() === ''){
        return res.status(400).send({ msg:'Username is required' });
    }
    if (await findUser('username', username)){
        return res.status(409).send({ msg:'Username already exists' });
    }
    const user = await createUser(username);
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
});
//login existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        //user found, log them in and send back the token
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});
//logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});


//helper function to find user by field
async function findUser(field, value) {
    if (!value) return null;
    return users.find((user) => user[field] === value);
}
//helper function to create a user
async function createUser(username){
    const token = uuid.v4();
    const user = { username, token };
    users[username] = user;
    return user;
}

//set auth cookie in the http response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly:true,
        sameSite:'strict',
    });
}

//set up api router
app.use('/api', apiRouter);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});