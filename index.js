const { getPeliculas } = require("./gpt")
const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require("discord.js");
const dotenv = require('dotenv')

dotenv.config()

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent]
    // intents: 3276799

});


client.on(Events.ClientReady, c => {
    console.log(`bot conectado como ${client.user.username}!`)

    c.user.setActivity('peliculas');

    const peliculaCommand = new SlashCommandBuilder()
        .setName('pelicula')
        .setDescription('proporciona una lista de peliculas');


    c.application.commands.create(peliculaCommand);

});



client.on(Events.MessageCreate, async (message) =>{

    if(message.author.bot) return;
    if(!message.content.startsWith('!'))return;

    const args = message.content.slice(1).split(' ')[0]

    //text command handler

    try {
        const command = require(`./commands/${args}`);
        command.run(message)
    } catch (error){
        console.log(`Ha ocurrido un error al utilizar el comando -${args},`, error.message);
    }
    
    
});

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'pelicula'){
        await interaction.deferReply();
        const pelicula = await getPeliculas();
        await interaction.editReply(pelicula);
    }

});


client.login(process.env.DISCORD_BOT_TOKEN);

// console.log(process.env.DISCORD_BOT_TOKEN)