const fs = require('fs');
const archivo = "./db/pedidos.json"

const guardardb=( data )=>{
    fs.writeFileSync(archivo,JSON.stringify(data));
}

const leerdb = () => {

    if ( !fs.existsSync(archivo)) {
        return null
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8'});

    const data = JSON.parse( info );

    // console.log("Info:",info,typeof(info));
    // console.log("Data:",data,typeof(data));

    return data;

}

module.exports = {
    guardardb,
    leerdb
}