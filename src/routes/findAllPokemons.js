const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
          const message = 'La liste des pokemons n\'a pa pu etre récupéree. Réessayez dans quelques instants.'
          res.status(500).json({message, data: error})
      })
  })
}