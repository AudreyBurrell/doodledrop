const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

let users = [];

let apiRouter = express.Router();
app.use('/api', apiRouter);
app.use(express.json());
app.use(cookieParser());



apiRouter.post('/create-user', (req, res) => {
    const { username } = req.body;
    if (users.some(user => user.username === username)) {
        return res.status(400).send('Username already taken.');
    }
    const newUser = {
        username,
        id: uuid.v4(),
    };
    users.push(newUser);
    res.status(201).send({ message: 'User created', username });
});

apiRouter.post('/login', (req, res) => {
    const { username } = req.body;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).send('User not found.');
    }
    const sessionToken = uuid.v4();
    res.cookie('session', sessionToken, { httpOnly: true });
    res.send({ message:'Logged in successfully' });
})

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});