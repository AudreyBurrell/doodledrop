// websocket.js
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ noServer: true });

// Add any WebSocket event handlers, for example:
wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
    ws.on('message', (message) => {
        // console.log('Received:', message);
        //trying this below
        try {
            const data = JSON.parse(message);
            if (data.type === 'login') {
                activeUsers.add(data.username);
            } else if (data.type === 'logout') {
                activeUsers.delete(data.username);
            }
            const activeUsersArray = Array.from(activeUsers);
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify( { type:'activeUsers', users:activeUsersArray }));
                }
            });
        } catch (err) {
            console.error('Error parsing message:', err);
        }
    });
    ws.on('close', () => {
        console.log('Websocket connection closed');
    });
});

module.exports = wss;
