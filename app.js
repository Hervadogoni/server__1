const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

// database connexion 
sequelize.initDb()


// Middleware 
app.use(bodyParser.json())


// Api endpoints                                   
require('./src/routes/findAllPokemons')(app) // const findAllPokemons = require('./src/routes/findAllPokemons') // findAllPokemons(app)                                           
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// Gestion des erreurs 404 
app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL."
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))