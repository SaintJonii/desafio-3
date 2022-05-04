const ContenedorArchivo = require('../Database/ContenedorArchivo')

module.exports = class ProductsController{

    constructor(){
        this.archivos = new ContenedorArchivo("Productos.txt");
    }


    getAll(){
        return this.archivos.getAll()
    }

    getRandom(){
        return this.archivos.getRandom()
    }

}