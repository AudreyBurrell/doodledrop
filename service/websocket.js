const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ noServer: true });

let activeUsers = new Set();

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        const data = JSON.parse(message);
        if (data.type === 'login') {
          activeUsers.add(data.username);
          broadcastActiveUsers();
        } else if (data.type === 'logout') {
          activeUsers.delete(data.username);
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
        if (client.readyState === WebSocket.OPEN) {
            client.send(userList);
        }
    });
    // wss.clients.forEach((client) => {
    //     client.send(JSON.stringify(Array.from(activeUsers)));
    // });
}

module.exports = wss;
