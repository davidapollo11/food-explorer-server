const knex = require('../database/knex')

class FavoritesController {
  async create(request, response) {
    const { plate_id } = request.body
    const { id } = request.params

    const favorites = await knex('favorites-plates').where({ user_id: id })
    
    if(favorites) {
      await knex('favorites-plates').where({ user_id: id }).delete()
    }

    const inserts = plate_id.map(plate_id => {
      return {
        plate_id,
        user_id: id
      }
    })

    await knex('favorites-plates').insert(inserts)

    return response.status(200).json(inserts)
  }

  async index(request, response) {
    const { id } = request.params

    const favoritesId = await knex('favorites-plates').where({ user_id: id })

    return response.status(200).json(favoritesId)
  }
}

module.exports = FavoritesController