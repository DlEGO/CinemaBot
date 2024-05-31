const base_url = "http://localhost:1234/v1";
const api_key = "lm-studio";


module.exports = {
    description: 'genera una lista de peliculas segun el genero',
    run: async(message) => {
        const args = message.content.split(' ').slice(1).join(' ');

        if(args.lenght < 1)return message.reply('Provee un argumento valido.');


        const getPeliculasGenre = async () => {
            const url = `${base_url}/chat/completions`;
        
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key}`
            };
        
            const body = JSON.stringify({
                model: `TheBloke/dolphin-2.2.1-mistral-7B-GGUF`,
                messages: [
                    { role: "assistant", content: "Eres un experto en peliculas, encargado de sugerir las mejores peliculas para los usuarios, teniendo en cuenta el genero especificado." },
                    { role: "user", content: `dame peliculas de este genero: ${args}. No expliques nada y solo dame la lista de 3 peliculas que cumplan con los generos indicados, unicamente dame la lista de peliculas. La estructura tiene que ser la siguiente:
                    **Lista de peliculas de ${args}**
                    **1.**: Titulo de la pelicula
                    **2.**: Titulo de la pelicula
                    **3.**: Titulo de la pelicula ` }
                ]
            });
        
            try {
                const response = await fetch(url,{
                    method: 'POST',
                    headers: headers,
                    body: body
                });
                
                if (!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                return data.choices[0].message.content;
            } catch (error) {
                console.error('Error fetching data:',error);
                throw error;
            }
        };


        const pelicula = await getPeliculasGenre(args);
        await message.channel.send(pelicula);
    }
}
