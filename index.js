const mineflayer = require("../mineflayer-bedrock-public");
const vec3 = require("vec3");

const username = 'Bot';
const server = '192.168.0.47';

let options = {
    version: 'bedrock_1.21.50',
    host: server,
    autoInitPlayer: true,
    //if remove skipPing, bot will not able to join server (some error)
    skipPing: true,
    port: 20050,
    offline: true,
    username: username,
    logging: true,
    physicsEnabled: false
}

const bot = mineflayer.createBot(options);

// Listen for chat messages from the server and echo them back.
bot._client.on('text', (packet) => {
    if (packet.source_name != bot._client.username) {
        bot._client.queue('text', {
        type: 'chat', needs_translation: false, source_name: bot._client.username, xuid: '', platform_chat_id: '', filtered_message: '',
        message: `${packet.source_name} said: ${packet.message} on ${new Date().toLocaleString()}`
      })
    }
  });

  bot.on('game', () => {
    console.log("bot.spawnPoint: " + bot.spawnPoint);
});

bot.once("spawn", () => {
  mineflayerViewer(bot, { port: 3000 });
  const path = [bot.entity.position.clone()]
    bot.on('move', () => {
        if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
            path.push(bot.entity.position.clone())
            bot.viewer.drawLine('path', path)
        }
    })
});

// Game started
bot._client.on('start_game', (packet) => {
    console.log('Game start authed!');
    console.log(`move_packet_type: ${packet.movement_authority}`);
    console.log(`location: ${packet.player_position.x} ${packet.player_position.y} ${packet.player_position.z}`);
    console.log(`version: ${bot.version}`);
    bot.spawnPoint = vec3(packet.player_position.x, packet.player_position.y, packet.player_position.z);
  });