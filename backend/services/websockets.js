/**
 * websockets.js
 *
 * This module sets up a basic WebSocket server using the `ws` library.
 * It allows multiple users to join "rooms" and send messages only to other users in the same room.
 * The server listens on port 8080 and keeps track of which client is in which chat room.
 * It sends a welcome message to every new connection and filters messages by room before broadcasting.
 */

const WebSocket = require('ws');

// Create a new WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 10701 });

// When a new client connects...
wss.on('connection', ws => {
    // Initialize an empty room for the connected client
    ws.room = "";

    // When a client sends a message...
    ws.on('message', message => {
        // Log the received raw message
        console.log(`Received message => ${message}`);

        // Parse the message into a JavaScript object
        let msg = JSON.parse(message);

        // If the message contains a room to join, assign the client to that room
        if (msg.joinRoom) {
            ws.room = msg.joinRoom;
        }

        // If the message has a `room` field (i.e., it's meant to be broadcast),
        // send it to all clients in the same room
        if (msg.room) {
            websocketSendToAll(JSON.stringify(msg));
        }
    });

    // Send a welcome message to the newly connected client
    ws.send(JSON.stringify({
        name: 'Server',
        message: 'Hello and welcome to the chat! To begin chatting you have to enter a name of the chat room that you want to chat in!'
    }));
});

/**
 * Broadcasts a message to all clients in the same room.
 * Only clients whose `ws.room` matches the `room` in the message will receive it.
 *
 * @param {string} text - The message to send, as a JSON string.
 */
function websocketSendToAll(text) {
    // Loop over all connected clients
    wss.clients.forEach(function each(client) {
        // Make sure the client is still connected
        if (client.readyState === WebSocket.OPEN) {
            // Only send the message if the client is in the same room
            if (client.room === JSON.parse(text).room) {
                client.send(text);
            }
        }
    });
}

