const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const axios = require('axios');


class Respuestas {

    boxnumber = 0
    boxch = 150_000
    boxgr = 600_001


    order_started={
        "nested": [],
        "parameters": {
            "start_time": "",
            "box_number": "",
            "TRANSFERID": "",
            "host_num_alm": "",
            "sub_order_id": "",
            "order_id": "",
            "uuid":""
            },
        "messagetype":""
    };

    order_finished ={   
        "nested":[],
        "parameters": {
            "box_number": "",
            "host_num_alm":"",
            "order_id": "",
            "sub_order_id": "",
            "station_id": "",
            "finish_time": "",
            "transfer_id":"", 
            "uuid":""
            }, 
        "messagetype": "order_finished"
    }
    
    station_response = {
        "nested": [],
        "parameters": {
            "box_number": "602592",
            "TRANSFERID": "425648",
            "host_num_alm": "401",
            "station_id": "MANUAL-AREA",
            "diverted_time": "20230701131124",
            "sub_order_id": "1",
            "order_id": "82465",
            "uuid": "eb6865c0-645c-4815-a2ac-9bda4793fc71",
            "status": "pk_finish"
        },
        "messagetype": "station_response"
    }

    station_response_article = {
        "nested": [],
        "parameters": {
            "host_line_id": "",
            "article_id": "",
            "station_id": "",
            "geo_code": "",
            "ordered_packunits": "",
            "picked_packunits": "",
            "packunit_size": ""
        },
        "messagetype": "line_response"
    }

    constructor() {
        // To do: Leer DB si existe
        this.leerOrderstarted();
    }

    get paramsOrder_start() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }

    }

    get paramsClima() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }

    }

    get historialCapitalizado() {
        return this.historial.map( lugar =>{
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        })
    }

    async responde( respuesta = '') {
        try {
            // Petición http
            const instance = axios.create(
                {
                    baseURL: `localhost:8085/order_insert/respuesta${ respuesta }.json`,
                    params:this.paramsOrder_start
                }

            );

            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            console.log('Ha ocurrido un error');
            return[];            
        }
    }

    async responde (resp,url) {
        try {
            // instance
            const instance = axios.create({
                    baseURL: "http://192.168.125.14:50000/RESTAdapter",
                });
                const respuesta = await instance.post(url, resp, {
                    auth: {
                        username: 'interfaz_po',
                        password: '1053Catamarca'
                    }
                });
                console.log(respuesta.data);
            return instance.data;



        } catch (error) {

            console.log(error);
            
        }
    }

    agregarHistorial = (ciudad) => {
        if (this.historial.includes( ciudad.toLocaleLowerCase())) {
            return
        }
        this.historial.unshift(ciudad.toLocaleLowerCase());
        this.grabarDb();
    }

    grabarDb = () =>{
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath,JSON.stringify(payload));
    }

    leerOrderstarted = () => {
        this.order_started = {
            "nested": [],
            "parameters": {
                "start_time": "20230530150724",
                "box_number": "100007",
                "TRANSFERID": "144017",
                "host_num_alm": "401",
                "sub_order_id": "1",
                "order_id": "88366",
                "uuid":uuidv4()
                },
            "messagetype":"order_started"} 
    }

    genera_boxnumber = (pedido) => {
        console.log(pedido);
        if (pedido.parameters.tu_type = "101"){
            this.boxch = this.boxch + 1
            this.boxnumber = this.boxch
        } else {
            this.boxgr=this.boxgr+1
            this.boxnumber = this.boxgr
        }

    }

    arma_order_started = ( pedido ) => {
        let muestra = new Date().toISOString();
        muestra = muestra.substring(0,4)+muestra.substring(5,7)+muestra.substring(8,10)+muestra.substring(11,13)+muestra.substring(14,16)+muestra.substring(17,19);
        this.order_started = {
            "nested": [],
            "parameters": {
                "start_time": muestra,
                "box_number": this.boxnumber,
                "TRANSFERID": pedido.parameters.transfer_id,
                "host_num_alm": pedido.parameters.host_num_alm,
                "sub_order_id": pedido.parameters.sub_order_id,
                "order_id": pedido.parameters.order_id,
                "uuid":uuidv4()
                },
            "messagetype":"order_started"} 
    }

    arma_order_finished = ( pedido ) => {
        let muestra = new Date().toISOString();
        muestra = muestra.substring(0,4)+muestra.substring(5,7)+muestra.substring(8,10)+muestra.substring(11,13)+muestra.substring(14,16)+muestra.substring(17,19);
        
        this.order_finished = {   
            "nested":[],
            "parameters": {
                "box_number": this.boxnumber,
                "host_num_alm":"401",
                "order_id": pedido.parameters.order_id,
                "sub_order_id": pedido.parameters.sub_order_id,
                "station_id": "",
                "finish_time": muestra,
                "transfer_id":pedido.parameters.transfer_id, 
                "uuid":uuidv4()
                }, 
            "messagetype": "transport_finished"
        }
    }

    arma_station_response = ( pedido ) => {
        let muestra = new Date().toISOString();
        muestra = muestra.substring(0,4)+muestra.substring(5,7)+muestra.substring(8,10)+muestra.substring(11,13)+muestra.substring(14,16)+muestra.substring(17,19);
        this.station_response =
        {
        "nested": [],
        "parameters": {
            "start_time": muestra,
            "box_number": this.boxnumber,
            "TRANSFERID": pedido.parameters.transfer_id,
            "host_num_alm": "401",
            "sub_order_id": pedido.parameters.sub_order_id,
            "order_id": pedido.parameters.order_id,
            "uuid":uuidv4()
            },
        "messagetype":"station.response"};

        pedido.nested.forEach((articulo, index) => {
            this.arma_station_response_article(articulo);
            this.station_response.nested[index]=this.station_response_article
        });




    }

    arma_station_response_article = ( pedido ) => {
        this.station_response_article =	{
            "nested": [],
            "parameters": {
                "host_line_id": pedido.parameters.host_line_id,
                "article_id": pedido.parameters.article_id,
                "station_id": "",
                "geo_code": pedido.parameters.geo_code,
                "ordered_packunits": pedido.parameters.ordered_packunits,
                "picked_packunits": pedido.parameters.ordered_packunits,
                "packunit_size": pedido.parameters.packunit_size
            },
            "messagetype": "line_response"
        }
        console.log(this.station_response_article.parameters);
        
    }






}

module.exports = Respuestas;