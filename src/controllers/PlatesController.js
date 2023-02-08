const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class PlatesController {
  async create(request, response) {
    const { title, description, price, category, ingredients } = request.body

    const plate_id = await knex('plates').insert({
      title,
      description,
      price,
      category
    })

    const tagsInsert = ingredients.map(ingredient => {
      return {
        plate_id,
        name: ingredient
      }
    })

    await knex('plates-ingredients').insert(tagsInsert)

    return response.status(201).json()
  }

  async show(request, response) {
    const { id } = request.params

    const plate = await knex('plates').where({ id }).first()

    const ingredients = await knex('plates-ingredients')
    .where({ plate_id: id })
    .orderBy('name')

    return response.json({
      ...plate,
      ingredients
    })
  }

  async delete(request, response) {
    const { id } = request.params
    
    await knex('plates').where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { title } = request.query

    let plates = await knex('plates')
    .whereLike('title', `%${title}%`)
    .orderBy('title')

    const allIngredients = await knex('plates-ingredients')

    const plateWithIngredients = plates.map(plate => {
      const plateIngredient = allIngredients.filter(ingredient => ingredient.plate_id === plate.id)

      return {
        ...plate,
        ingredients: plateIngredient
      }
    })

    return response.json(plateWithIngredients)
  }
}

module.exports = PlatesController