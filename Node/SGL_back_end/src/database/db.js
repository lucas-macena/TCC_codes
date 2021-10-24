const Database = require('sqlite-async')//importando o modulo

function execute(db){
    //console.log('cheguei aki')
    //console.log(db), db.exec executa funções de SQL
    //criar as tabelas do banco de dados
    return db.exec(`
        CREATE TABLE IF NOT EXISTS tombamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            referencia TEXT,
            topicoEnviar TEXT,
            topicoReceber TEXT,
            state TEXT,
            bio TEXT,
            gerente TEXT,
            ip TEXT,
            fw_version TEXT,
            FOREIGN KEY (gerente) REFERENCES users (name)
        );

        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            pass TEXT,
            name TEXT,
            access INTEGER,
            tombamento TEXT,
            status TEXT,
            github,
            FOREIGN KEY (name) REFERENCES tombamentos (gerente)
        );

        CREATE TABLE IF NOT EXISTS messagesSent (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            message TEXT,
            sendTo TEXT,
            name TEXT,
            sendTime TIMESTAMP DATE DEFAULT (datetime('now','localtime'))
            
        );

        CREATE TABLE IF NOT EXISTS logsUsuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            message TEXT,
            tombamento TEXT,
            pendencias TEXT,
            etapa TEXT,
            sendTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            
        );

        CREATE TABLE IF NOT EXISTS whitelist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip TEXT,
            user TEXT,
            name TEXT,
            access TEXT,
            loginTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            renewTime INTEGER
            
        );
        
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)