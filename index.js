const mineflayer = require("../mineflayer-bedrock-public");

const username = 'Bot'
const server = '192.168.0.47'
const batchingInterval = 50

let options = {
    version: 'bedrock_1.21.50',
    host: server,
    autoInitPlayer: true,
    //if remove skipPing, bot will not able to join server
    skipPing: true,
    port: 20050,
    offline: true,
    username: username,
    batchingInterval: batchingInterval,
    logging: true,
    physicsEnabled: true
}

const bot = mineflayer.createBot(options)

bot._client.on('text', (packet) => { // Listen for chat messages from the server and echo them back.
    if (packet.source_name != bot._client.username) {
        bot._client.queue('text', {
        type: 'chat', needs_translation: false, source_name: bot._client.username, xuid: '', platform_chat_id: '', filtered_message: '',
        message: `${packet.source_name} said: ${packet.message} on ${new Date().toLocaleString()}`
      })
    }
  })

