const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('doodledrop');

// async function connectToDatabase() {
//     try {
//         await client.connect();
//         db = client.db(config.dbName);
//         console.log('Connected to database successfully!')
//     } catch (ex) {
//         console.log(`Unable to connect to datablse with ${url} because ${ex.message}`);
//         process.exit(1)
//     }
// }
// (async function testConnection() { //this will asynchronously test the connection and test the process if it fails
//     try {
//       await db.command({ ping: 1 });
//     } catch (ex) {
//       console.log(`Unable to connect to database with ${url} because ${ex.message}`);
//       process.exit(1);
//     }
//   })();

//   connectToDatabase();

//   module.exports = {
//     client
//   };