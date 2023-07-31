const axios = require('axios');
const mandarRespuesta = async () => {

    const respuesta = await axios.post("http://127.0.0.1:8085/order_insert/respuesta",{nombre:"Hugo"})
    console.log(respuesta.data.body);


}

mandarRespuesta();

