require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { port, allowedOrigins } = require('./config/config');
const socketHandler = require('./socket/chat');

const aiRoutes = require('./routes/ai.routes');
app.use('/api/ai', aiRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

socketHandler(io);

server.listen(port, () => console.log(`Server has started on port ${port}`));
