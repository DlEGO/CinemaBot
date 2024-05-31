module.exports = {
    description: 'repite los argumentos dados',
    run: async(message) => {
        const args = message.content.split(' ').slice(1).join(' ');

        if(args.lenght < 1)return message.reply('Provee un argumento valido.');

        await message.channel.send(args);
        await message.delete();
    }
}