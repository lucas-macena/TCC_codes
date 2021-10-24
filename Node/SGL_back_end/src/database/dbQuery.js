const Database = require('./db.js');


const tombamentoValue = {
    name: "tanque",
    referencia: "esp32",
    topicoEnviar:"MacenaEnvia",
    topicoReceber:"MacenaRecebe",
    state: "offline",
    bio: "Bancada do tanque industrial do Lamotriz"
}

const adicionarValor = `
INSERT INTO tombamentos (
    name,
    referencia,
    topicoEnviar,
    topicoReceber,
    state,
    bio
) VALUES (
    "${tombamentoValue.name}",
    "${tombamentoValue.referencia}",
    "${tombamentoValue.topicoEnviar}",
    "${tombamentoValue.topicoReceber}",
    "${tombamentoValue.state}",
    "${tombamentoValue.bio}"
);
`

const adicionarColuna = `
ALTER TABLE tombamentos
ADD state string;

`

const dropTable = `
DROP TABLE tombamentos;

`

async function realizarQuery(query) {
    const db = await Database;
    const realizado = await db.run(query)
}

const query = realizarQuery(adicionarValor);