const Pedido = require("./pedido");

class Pedidos  {
    _listado = {};

    
    constructor()  {
        this._listado = {}
    }

    cargarPedidosFromArray( pedidos = []) {
        pedidos.forEach( pedido => {
            this._listado[pedido.id] = pedido;
        })
    }

    crearPedido ( desc = '') {

        const pedido = new Pedido ( desc );
        this._listado [pedido.id] = pedido;

    }

    borrarPedido( id = '') {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    listadoCompleto(){

        console.log( "\n=========Listado de pedidos===========")

        this.listadoArr.forEach((pedido,i) =>{

            const idx = `${i + 1}`.green;

            const { desc,completadoEn} = pedido;
            const estado = ( completadoEn )
            ? 'Completada'.green
            : 'Pendiente'.red;
            
            console.log( `${idx} ${desc} ::  ${estado}`);
            

        })
        console.log( "=====================================\n")


    }


    listarPendientesComnpletadas(completadas = true){

        (completadas)
        ? console.log( "\n=========Pedidoss Completadas===========")
        : console.log( "\n=========Pedidos Pendientes ===========")

        this.listadoArr.forEach((pedido,i) =>{

            const idx = `${i + 1}`.green+'.'.green;

            const { desc,completadoEn} = pedido;
            const estado = ( completadoEn )
            ? 'Completada'.green
            : 'Pendiente'.red;
            if (completadas){
                // mostrar completadas
                if (completadoEn){
                    console.log( `${idx} ${desc} ::  ${completadoEn}`);
                }
            } else
                if (!completadoEn){
                    console.log( `${idx} ${desc} ::  ${estado}`);
                }
        })
        console.log( "=====================================\n")


    }


    get listadoArr () {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const pedido = this._listado[key];
            listado.push (pedido)
            
        });
        return listado;
    }


    toggleCompletadas( ids = []) {
        console.log(ids);
        ids.forEach( id => {
            const pedido = this._listado[id];
            console.log(pedido.id,pedido.desc,pedido.completadoEn);
            if ( !pedido.completadoEn) {
                pedido.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( pedido => {
            console.log(pedido);
            if (!ids.includes(pedido.id)){
                pedido.completadoEn = null;
            }
        })
    }

}

module.exports = Pedidos;
