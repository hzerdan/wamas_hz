const { Schema, model } = require('mongoose');

const OtSchema = Schema({
        order_id:{
            type:Number,
            required:[true, "El numero de ot es requerido"]
        },
        hora_de_recepcion:{
            type:Date
        },
        enviado_order_started:{
            type:Boolean
        },
        hora_order_started:{
            type:Date
        },
        status_order_started:{
            type:Number
        },

        enviado_order_finished:{
            type:Boolean
        },
        hora_order_finished:{
            type:Date
        },
        status_order_finished:{
            type:Number
        },


        enviado_station_response:{
            type:Boolean
        },
        hora_station_response:{
            type:Date
        },
        status_station_response:{
            type:Number
        },
},

cargaDatosOrder_insert =(order_insert) => {

    this.order_id = order_insert.order_id;
    this.hora_de_recepcion=new Date();
}




);

module.exports = model('Ot',OtSchema);