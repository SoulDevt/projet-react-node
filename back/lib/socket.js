const { createMessage } = require('../services/messages');

const messages = new Set();

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.user = socket.handshake.query.userId;
    this.socket.join(this.user);
    this.io = io;

    socket.on('message', (value) => this.handleMessage(value));
    socket.on('deleteUser', (userId) => this.deleteUser(userId));
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on('disconnect', () => {
      this.socket.leave(this.user);
      this.user = null;
      this.socket.disconnect();
    });
  }

  async sendMessage(data) {
    const message = await createMessage({
      content: data.content,
      sender: data.sender,
      receiver: data.receiver,
      date: data.date
    });
    if (this.user) {
      this.io.sockets.to([data.receiver, data.sender]).emit('message', message);
  }
  }

  // async sendIsTyping(data) {
  //   if (users.has(data.receiver)) {
  //     try {
  //       this.io.sockets.to(users.get(data.receiver).id).emit('isTyping', {
  //         ...data,
  //       });
  //     } catch (error) {
  //       console.error('socket IO error', { metadata: error });
  //     }
  //   }
  // }

  handleMessage(value) {
    const message = {
      content: value.content,
      receiver: value.receiver,
      sender: value.sender,
      date: Date.now(),
    };

    messages.add(message);
    this.sendMessage(message);
    messages.delete(message);
  }

  deleteMessage(messageId) {
    this.io.sockets.emit('deleteMessage', messageId);
  }

  deleteUser(userId) {
    users.delete(userId);
  }
}

const chat = (io) => {
  io.on('connection', (socket) => {
    new Connection(io, socket);
  });
}

module.exports = chat;
