const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users=[];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let apiRouter = express.Router();
app.use('/api', apiRouter);

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
async function findUser(field, value) {
    if (!value) return null;
    return users.find((user) => user[field] === value);
}
async function createUser(username){
    const user = {
        username : username,
        token: uuid.v4(),
    };
    users.push(user);
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


const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});