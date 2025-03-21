const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ noServer: true });


let activeUsers = new Set();

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        if (message === 'login') {
            ws.username = data.username;
            activeUsers.add(data.username);
            broadcastActiveUsers();
        } else if (message === 'logout') {
            activeUsers.delete(ws.username);
            broadcastActiveUsers();
        }
    });
    ws.on('close', () => {
        if (ws.username) {
            activeUsers.delete(ws.username);
            broadcastActiveUsers();
        }
        console.log('Client disconnected');
    });
});

function broadcastActiveUsers() {
    const userList = JSON.stringify(Array.from(activeUsers));
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(userList);
        }
    });
    // wss.clients.forEach((client) => {
    //     client.send(JSON.stringify(Array.from(activeUsers)));
    // });
}

module.exports = wss;
