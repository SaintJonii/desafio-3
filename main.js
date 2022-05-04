const express = require('express')
const ProductsController = require('./Controllers/ProductsController.js')

const app = express()
const PORT = 8080

const server = app.listen(PORT, () =>{
    console.log(`Servidor express desplegado en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor: ${error}`))

const controlador = new ProductsController("Productos.txt")


app.get('/productos', async (req, res) => {
    res.send (await controlador.getAll())
})

app.get('/productoRandom', async (req, res) => {
    res.send (await controlador.getRandom())
})
