const fs = require('fs')

module.exports = class ContenedorArchivo {
    
    static filesList = []

    constructor(title) {
        this.title = title
    }


    async save(product) {
        const id = ContenedorArchivo.filesList.length + 1
        product = {...product, id: id}
        ContenedorArchivo.filesList.push(product)
    
        try{
            await fs.promises.writeFile(`./${this.title}`, JSON.stringify(ContenedorArchivo.filesList))
        }
        catch(err){
            console.warn('Hubo un error al guardar el item: ' + err)
        }
      }
  
    async getById(id) {
        try{
            await fs.promises.readFile(`Database/${this.title}`, 'utf-8')
            .then( contenido =>{
                const jsonContent = JSON.parse(contenido);
                const item =  jsonContent.find(item => item.id == id)
                console.log(`Item con id[${id}]: ${JSON.stringify(item)}`)
            })
        }
        catch(err){
            console.warn('Hubo un error al buscar el item: ' + err)
        }
        
      }
  
    async getAll() {
        try{
            return await fs.promises.readFile(`Database/${this.title}`, 'utf-8')
            .then( contenido =>{
                const jsonContent = JSON.parse(contenido);
                console.log(jsonContent);
                return jsonContent;
            })
        }
        catch(err){
            console.warn('Hubo un error al buscar el item: ' + err)
        }
      }

      async getRandom() {
        try{
            return await fs.promises.readFile(`Database/${this.title}`, 'utf-8')
            .then( contenido =>{
                const jsonContent = JSON.parse(contenido);
                var item = jsonContent[Math.floor(Math.random()*jsonContent.length)];
                console.log(item);
                return item;
            })
        }
        catch(err){
            console.warn('Hubo un error al buscar el item: ' + err)
        }
        
      }
  
    async deleteById(id){
        ContenedorArchivo.filesList = ContenedorArchivo.filesList.filter( item => item.id != id);

        try{
            await fs.promises.writeFile(`Database/${this.title}`, JSON.stringify(ContenedorArchivo.filesList))
            console.log(`Se elimino el item con id:${id}`);
            this.getAll();
        }
        catch(err){
            console.warn('Hubo un error al guardar el item: ' + err)
        }

      }
  
    deleteAll() {
        ContenedorArchivo.filesList = [];
        fs.writeFile(`./${this.title}`, JSON.stringify(ContenedorArchivo.filesList), error =>{
            if(error){
                console.log(`Hubo un error al eliminar items: ${error}`);
            }
            else{
                console.log(`Se eliminaron todos los items del archivo`);
                this.getAll();
            }
        })    
    }
}








