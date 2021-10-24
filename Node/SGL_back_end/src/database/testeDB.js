const db = require('./db.js');
const Database = require('./db.js');





const tombamentoValue = {
    name: "esteira",
    referencia: "wemos D1 mini",
    topicoEnviar:"MacenaEnvia",
    topicoReceber:"MacenaRecebe"
}

const query = `
INSERT INTO tombamentos (
    name,
    referencia,
    topicoEnviar,
    topicoReceber
) VALUES (
    "${tombamentoValue.name}",
    "${tombamentoValue.referencia}",
    "${tombamentoValue.topicoEnviar}",
    "${tombamentoValue.topicoReceber}"
);
`

// const insertedTombamento = inserirDado(query)
const name = 'esteira'
const query2 = `
        SELECT *
        FROM tombamentos
        WHERE name = "${name}"
    `

async function lerDB(query) {
    try{
        const db = await Database
        const dados =  await db.all(query)
        console.log(dados)
    
        // return dados    
    
    } catch (error) {
        console.log(error)
    }
    
}

const retorno = lerDB(query2)
