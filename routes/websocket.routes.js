const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

router.get('/test-websocket', (req, res) => {
    console.log('check websocket via insomnia');
    // You can handle the HTTP request as needed

    // Create a WebSocket connection on this route
    const wss = new WebSocket.Server({ noServer: true });

    // Upgrade the HTTP request to a WebSocket connection 
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
        wss.emit('connection', ws. req);
    });

    res.status(200).json({ message: 'WebSocket test initiated' });
})

module.exports = router;