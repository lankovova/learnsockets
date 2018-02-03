var express = require('express');
var app     = express();
var path    = require('path');
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

router.get('/messages', (req, res) => {
    res.json([
        {"id": "1", "time": "05:43 pm", "text": "hello"},
        {"id": "2", "time": "05:44 pm", "text": "hi"},
        {"id": "3", "time": "05:50 pm", "text": "glad to see you here"},
        {"id": "4", "time": "06:30 pm", "text": "yeah!"},
    ]);
});

app.use(express.static('dist'));
app.use('/api', router);

io.on('connection', (client) => {
    // Notify all users except sender that new user has connected
    client.broadcast.emit('user connected', client.id);

    // When user sends message
    client.on('chat message', (message) => {
        // Notify all users about new incoming message
        io.emit('chat message', {message: message, clientId: client.id});
    });

    // When someone has disconnected
    client.on('disconnect', () => {
        // Notify all users except sender that user has disconnected
        client.broadcast.emit('user disconnected', client.id);
    });
});

http.listen(3000, () => console.log('listening on :3000'));
