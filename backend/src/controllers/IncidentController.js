const connection = require("../database/connection");

module.exports = {

    async index(request, response){

        const { page = 1 } = request.query;

        const [count] = await connection("incidents").count();

        const incidents = await connection("incidents")
                            .join("ongs", "ongs.id", "=", "incidents.ong_id")
                            .limit(5)
                            .offset((page -1) * 5)
                            .select([
                                    "incidents.*", 
                                    "ongs.name", 
                                    "ongs.email", 
                                    "ongs.whatsapp", 
                                    "ongs.city", 
                                    "ongs.uf"
                                ]);

        //O cabecalho da resposta ira retornar o total de registros
        response.header("X-Total-Count", count['count(*)']); 

        return response.json(incidents);
    },


    async delete(request, response){
        const { id } = request.params;   
        const ong_id = request.headers.authorization; 

        const incident = await connection("incidents")
                                .where("id", id)
                                .select("ong_id")
                                .first();

       if (incident.ong_id !== ong_id){
           return response.status(401).json({error: "Operation not permitted"});
       }     
       
       await connection("incidents").where("id", id).delete();
       return response.status(204).send(); //resposta sem conteudo
    },

    async create (request, response){
        const { title, description, value } = request.body; 

        //o valor do campo ong_id será retornado pelo cabecalho da requisicao
        //O nome Authorization foi definido no Insomina
        const ong_id = request.headers.authorization; 

        const [id] = await connection("incidents").insert({
            title,
            description,
            value,
            ong_id,
        })
        
        return response.json({ id });
    }
}