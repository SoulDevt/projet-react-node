const fakery = require('mongoose-fakery');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const { Message } = require('../../models/mongo');

fakery.fake('messages', Message, {
    content: 'Contenu du message',
    sender: '1',
    receiver: '1',
    date: new Date(),
});