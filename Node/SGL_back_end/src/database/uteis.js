const Database = require('./db.js');


async function inserirDado(query) {
    const db = await Database
    await db.run(query)
}





module.exports = {
    inserirDado
}