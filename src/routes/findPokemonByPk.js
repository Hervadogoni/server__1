const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
            const message = 'Le pokrmon demandé n\'existe pas. Réssayez avec un autre identifiant'
            return res.status(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = 'Le pokemons n\'a pa pu etre récupéré. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
    })
  })
}