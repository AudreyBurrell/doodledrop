const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ noServer: true });


let activeUsers = new Set();

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        if (message === 'login') {
            const username = ws.username;
            activeUsers.add(username);
            broadcastActiveUsers();
        } else if (message === 'logout') {
            const username = ws.username;
            activeUsers.delete(username);
            broadcastActiveUsers();
        }
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function broadcastActiveUsers() {
    wss.clients.forEach((client) => {
        client.send(JSON.stinrify(Array.from(activeUsers)));
    });
}

module.exports = wss;
