const Database = require("../database/db")

async function procurar_usuario(usuario){
    const db = await Database
    const queryUser = `
            SELECT *
            FROM users
            WHERE user = "${usuario}";
        `
    
    const fichaUsuario = await db.all(queryUser)
    return fichaUsuario
}

async function procurar_tombamentos(fichaUsuario){
    const db = await Database
    
    var queryUser = `WHERE name = "${fichaUsuario[0].tombamento}"`
    
    if (fichaUsuario[0].tombamento=="all"){queryUser=""}

    const queryTomb = `
        SELECT *
        FROM tombamentos
        ${queryUser};
    `


    const tombamentos = await db.all(queryTomb)

    return tombamentos
}

async function procurar_todos_tombamentos(){
    const db = await Database
    const queryTomb = `
        SELECT *
        FROM tombamentos
        
    `
    const tombamentos = await db.all(queryTomb)

    return tombamentos
}

async function procurar_topicos(tombamento){
    const db = await Database
    
    const query = `
        SELECT topicoEnviar,topicoReceber
        FROM tombamentos
        WHERE name = "${tombamento}";
    `
    const topicos = await db.all(query)

    return topicos
}

async function validar_usuario(usuario,pass){
    const db = await Database
    const queryUser = `
            SELECT name,pass,access
            FROM users
            WHERE user = "${usuario}";
        `
    
    

    try {
        const fichaUsuario = await db.all(queryUser)  
        if(fichaUsuario[0].pass == pass){return 1}
        else{return 0}  
    } catch (error) {
        return -1
    }
    
}

async function procurar_logs(user){
    const db = await Database
    const query = `
        SELECT *
        FROM logsUsuario
        WHERE user="${user}"
    `

    try {
        const logs = await db.all(query)
        return logs
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    procurar_usuario,
    procurar_tombamentos,
    procurar_todos_tombamentos,
    procurar_topicos,
    validar_usuario,
    procurar_logs
}