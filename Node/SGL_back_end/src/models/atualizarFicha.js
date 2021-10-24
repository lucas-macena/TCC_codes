const Database = require("../database/db")

async function atualizarFicha(dados){
    const db = await Database

    if(dados.name ==""){
        return ''
    }

    const query = `
        UPDATE users 
        SET status="ATIVO",
        name="${dados.name}",
        github="${dados.github}",
        linkedin="${dados.linkedin}",
        pass="${dados.pass}"
        WHERE user="${dados.usuario}"
        `
    
    const fichaUsuario = await db.all(query)
    return fichaUsuario
}

async function inserirLog(dados){
    const db = await Database
    
    if(dados.usuario =="" || dados.parecer==''||dados.tombamento==""||dados.pendencias==""||dados.etapa==''){
        return ''
    }

    const query = `
        INSERT INTO logsUsuario (
            user,
            message,
            tombamento,
            pendencias,
            etapa,
            sendTime
        )
        VALUES (
            "${dados.usuario}",
            "${dados.parecer}",
            "${dados.tombamento}",
            "${dados.pendencias}",
            "${dados.etapa}",
            (datetime('now','localtime'))
        );
        `
    
    const logs = await db.all(query)
    return logs
}

module.exports = {
    atualizarFicha,
    inserirLog
}