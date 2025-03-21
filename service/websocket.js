const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer:true });


let activeUsers = new Set();

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('ping', () => {
        console.log('Received ping, sending pong');
        ws.pong();  // Respond with a pong message
    });
    ws.on('pong', () => {
        console.log('Received pong');
    });
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

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
    console.log('Upgrade request received');
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
        console.log('WebSocket connection established');
    });
});


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

