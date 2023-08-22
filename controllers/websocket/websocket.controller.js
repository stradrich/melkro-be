const WebSocket = require('ws');
const http = require('http'); // Import HTTP module

// Create an HTTP server instance
const server = http.createServer((req, res) => {
    // Handle HTTP requests here if needed
})

const wss = new WebSocket.Server({
    // *SERVER OPTIONS* // 🛠 
    server: server
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

module.exports = {
    wss
}