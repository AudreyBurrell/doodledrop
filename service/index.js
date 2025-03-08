const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users=[];
let drawings=[];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let apiRouter = express.Router();
app.use('/api', apiRouter);

//middleware check authentication
const verifyAuth = (req, res, next) => {
    const token = req.cookies[authCookieName];
    const user = users.find(u => u.token === token);
    if (!user) {
        return res.status(401).send({ msg:'Unauthorized' });
    }
    req.user = user;
    next();
};

//Create a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Username already taken' });
    } else {
        const user = await createUser(req.body.username);
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
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
    const user = {
        username : username,
        token: uuid.v4(),
    };
    users.push(user);
    return user;
}
//endpoint to save a drawing
apiRouter.post('/drawings', verifyAuth, (req, res) => {
    const { drawingData } = req.body;
    const drawing = {
        id: uuid.v4(),
        username: req.user.username,
        drawingData,
    };
    drawings.push(drawing);
    res.status(201).send(drawing);
});
//endpoint to get all drawing for a user
apiRouter.get('/drawings', verifyAuth, (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).send({ msg: 'Username is requierd' });
    }
    const userDrawings = drawings.filter(drawing => drawing.username === username);
    res.send(userDrawings);
})


//set auth cookie in the http response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly:true,
        sameSite:'strict',
    });
}


const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});