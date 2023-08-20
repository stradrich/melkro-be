const WebSocket = require('ws');

const wss = new WebSocket.Server({
    // *SERVER OPTIONS* // 🛠 
});

// Handle WebSocket Connection
wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    // Handle incoming messages from clients
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
    });
})

