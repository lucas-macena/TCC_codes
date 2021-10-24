const Database = require("../database/db")

async function editarRow(banco,coluna,valor,linha,linhaValor){
    const db = await Database
    const queryUser = `
            UPDATE ${banco}
            SET ${coluna}="${valor}"
            WHERE ${linha} = "${linhaValor}";
        `
    
    const editado = await db.all(queryUser)
    return editado
}

module.exports = {
    editarRow
}