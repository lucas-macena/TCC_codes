const Database = require('../database/db.js');



async function newLogin(req,user) {
    const db = await Database;

    var ip = req.connection.remoteAddress.split(':')[3]
    if(ip==undefined){ip='localhost'}

    const retirarValor = `
        DELETE FROM whitelist
        WHERE ip = "${ip}";
    `

    const apagado = await db.all(retirarValor)
    
    const adicionarValor = `
        INSERT INTO whitelist (
            ip,
            user,
            name,
            access,
            renewTime,
            loginTime
        ) VALUES (
            "${ip}",
            "${user.user}",
            "${user.name}",
            "${user.access}",
            "${parseInt(Date.now())}",
            (datetime('now','localtime'))
        );
    `

    const realizado = await db.all(adicionarValor)
    return realizado
}

async function checkoutLogin(req) {
    const db = await Database;

    var ip = req.connection.remoteAddress.split(':')[3]
    if(ip==undefined){ip='localhost'}

    const retirarValor = `
        DELETE FROM whitelist
        WHERE ip = "${ip}";
    `

    const apagado = await db.all(retirarValor)
    return apagado
}

async function checkLogin(ip) {
    const db = await Database;
    
    const query = `
        SELECT *
        FROM whitelist
        WHERE ip="${ip}"
    `

    const realizado = await db.all(query)
    
    if(realizado[0]==undefined){return false}

    const attQuery = `
            UPDATE whitelist
            SET renewTime="${parseInt(Date.now())}"
            WHERE ip="${ip}"
        `
    
    var agora = Date.now()
    
    agora = (agora - realizado[0].renewTime)/(1000*60)

    if(agora <= 30){
        const realizadoATT = await db.all(attQuery)
        return true
    }
    else{return false}

    
}

async function validarLogin(req,res,next){

    var ip = req.connection.remoteAddress.split(':')[3]
    if(ip==undefined){ip='localhost'}
    
    const login = await checkLogin(ip)

    if(login==true){next()}
    else{res.redirect('/login')}
    // return login
    
}

async function whoIsIt(req){
    var ip = req.connection.remoteAddress.split(':')[3]
    if(ip==undefined){ip='localhost'}
    const db = await Database;
    
    const query = `
        SELECT *
        FROM whitelist
        WHERE ip="${ip}"
    `

    const realizado = await db.all(query)
    return realizado[0]
}

module.exports = {
    newLogin,
    checkLogin,
    checkoutLogin,
    validarLogin,
    whoIsIt
}

