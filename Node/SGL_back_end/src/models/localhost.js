


function localhost() {
    const ip = process.env.LOCALHOST
    const port = process.env.LOCALPORT
    

    servidor = {
        
        localhost: `${ip}:${port}`
        

        
    }

    return servidor.localhost
}

module.exports = {
    localhost
}