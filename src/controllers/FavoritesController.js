const knex = require('../database/knex')

class FavoritesController {
  async create(request, response) {
    const { user_id, plate_id } = request.params

    await knex('favorites-plates').insert({
      user_id,
      plate_id
    })

    return response.json()
  }

  async delete(request, response) {
    const { favorite_id } = request.params

    await knex('favorites-plates').where({ id: favorite_id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { user_id } = request.params

    const favoritePlateIdsForUser = await knex('favorites-plates')
      .select('plate_id')
      .where({ user_id })
      .orderBy('plate_id');

    const plates = await knex('plates')
      .whereIn('id', favoritePlateIdsForUser.map(fav => fav.plate_id));

    const allIngredients = await knex('plates-ingredients');

    const favoritesPlatesWithIngredients = plates.map(plate => {
      const ingredients = allIngredients.filter(ingredient => ingredient.plate_id === plate.id);

      return {
        ...plate,
        ingredients,
      };
    });

    return response.json(favoritesPlatesWithIngredients);
  }

}

module.exports = FavoritesController