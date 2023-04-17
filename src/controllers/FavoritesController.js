const knex = require('../database/knex')

class FavoritesController {
  async create(request, response) {
    const { plate_id } = request.body
    const user_id = request.user.id

    const favorites = await knex('favorites-plates').where({ user_id })
    
    if(favorites) {
      await knex('favorites-plates').where({ user_id }).delete()
    }

    const inserts = plate_id.map(plate_id => {
      return {
        plate_id,
        user_id
      }
    })

    await knex('favorites-plates').insert(inserts)

    return response.status(200).json(inserts)
  }

  async index(request, response) {
    const user_id = request.user.id

    const favoritesId = await knex('favorites-plates').where({ user_id })

    return response.status(200).json(favoritesId)
  }
}

module.exports = FavoritesController