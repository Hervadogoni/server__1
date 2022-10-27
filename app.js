const express = require('express')
const bodyParser = require('body-parser')
const {success, getUniqueId} = require('./helper')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => res.send("Hello Word !!! I'm backend"))

app.get('/api/pokemons', (req, res) =>{
    const message = 'La liste des pokemons a bien été récupérée'
    res.json(success(message, pokemons))
})

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = "Un pokemon a bien été trouvé"
    res.json(success(message, pokemon))
})

app.post('/api/pokemons', (req, res) => {
    let id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id: ++id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été crée`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = {...req.body, id: id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon 
    })
    const message = `Le probleme ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))