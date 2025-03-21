// websocket.js
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ noServer: true });

// Add any WebSocket event handlers, for example:
wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
    ws.on('message', (message) => {
        console.log('Received:', message);
    });
});

module.exports = wss;
