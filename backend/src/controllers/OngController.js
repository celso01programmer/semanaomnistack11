const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {

    async index(request, response){
        const ongs = await connection("ongs").select("*");
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body; //obtendo o conteudo do corpo da requisicao

        //gera um texto com 4 bytes de caracteres aleatório e faz a conversão para uma string do tipo hexadecimal
        const id = crypto.randomBytes(4).toString("HEX");
    
        await connection("ongs").insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf   
        })
        
        return response.json( { id });
    }
}