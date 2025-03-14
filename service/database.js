const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('doodledrop');
const userCollection = db.collection('users');
const imagesCollection = db.collection('images');

(async function testConnection() { //this will asynchronously test the connection and test the process if it fails
    try {
      await db.command({ ping: 1 });
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();

  function getUser(username) {
    return userCollection.findOne( { username });
  }

  function updateUser(user) {
    return userCollection.updateOne({ username: user.username }, { $set: user });
  }

  function createUser(user) {
    return userCollection.insertOne(user);
  }
  function getUserByToken(token) {
    return userCollection.findOne({ token });
  }
  async function addImage(username, imageData) {
    return imagesCollection.insertOne({ username: username, imageData:imageData, createdAt: new Date() });
  }
  function getGalleryImages(username) {
    return imagesCollection.find({ username }).toArray();
  }

  module.exports = {
    getUser,
    updateUser,
    createUser,
    getUserByToken,
    addImage,
    getGalleryImages,
  }

