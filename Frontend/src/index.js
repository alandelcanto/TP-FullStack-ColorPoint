import express from 'express'
import path from 'path'
import url from 'url'

// settings
const app = express()
app.set('PORT', 5000)
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

// middlewares
app.use(express.static(path.join(__dirname, '../public')))

// routes
const publicPath = path.join(__dirname, '../public')

app.get('/', (req, res) => {
    res.status(200).sendFile("bienvenida.html", { root: publicPath })
})

app.get('/productos', (req, res) => {
    res.status(200).sendFile("productos.html", { root: publicPath })
})

app.get('/carrito', (req, res) => {
    res.status(200).sendFile("carrito.html", { root: publicPath })
})

app.get('/ticket', (req, res) => {
    res.status(200).sendFile("ticket.html", { root: publicPath })
})

// listen
app.listen(app.get('PORT'), () => {
    console.log(`Server ejecutando en el puerto ${app.get('PORT')}`)
})