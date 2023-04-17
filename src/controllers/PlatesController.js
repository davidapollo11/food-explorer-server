const AppError = require('../utils/AppError')
const knex = require('../database/knex')

class PlatesController {
  async create(request, response) {
    const { title, description, price, category, ingredients } = request.body
    const user_id = request.user.id

    const fetchUser = await knex('users').where({ id: user_id })
    const [ user ] = fetchUser

    if(user.is_admin === 0) {
      throw new AppError('Você não tem permição para esta ação!')
    }

    const plate = await knex('plates').insert({
      title,
      description,
      price,
      category,
      user_id
    })
    const [ plate_id ] = plate


    const ingredientsInsert = ingredients.map(name => {
      return {
        name,
        user_id,
        plate_id
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    return response.status(201).json()
  }

  async update(request, response) {
    const { title, description, price, category, ingredients } = request.body
    const { id } = request.params

    const fetchPlate = await knex('plates').where({ id })
    const [ plate ] = fetchPlate

    if(!plate) {
      throw new AppError('Prato não encontrado!')
    }

    plate.title = title ?? plate.title
    plate.description = description ?? plate.description
    plate.price = price ?? plate.price
    plate.category = category ?? plate.category

    await knex('plates').where({ id }).update(plate)

    if(ingredients) {
      await knex('ingredients').where({ plate_id: id }).delete()

      const ingredientsInsert = ingredients.map(name => {
        return {
          name,
          plate_id: id,
          user_id: plate.user_id  
        }
      })

      await knex('ingredients').insert(ingredientsInsert)
    }

    return response.status(200).json()
  }

  async show(request, response) {
    const { id } = request.params

    const plate = await knex('plates').where({ id }).first()
    const ingredients = await knex('ingredients').where({ plate_id: id }).orderBy('name')

    return response.status(200).json({
      ...plate,
      ingredients
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('plates').where({ id }).delete()

    return response.status(200).json()
  }

  async index(request, response) {
    const { title, ingredients } = request.query

    let plates

    if(ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient)

      plates = await knex('ingredients')
      .select([
        'plates.id',
        'plates.title',
        'plates.user_id',
        'plates.image',
        'plates.price',
        'plates.category'
      ])
      .whereLike('plates.title', `%${title}%`)
      .whereIn('name', filterIngredients)
      .innerJoin('plates', 'plates.id', 'ingredients.plate_id')
      .orderBy('plates.title')

    } else {
      plates = await knex('plates')
      .whereLike('title', `%${title}%`)
      .orderBy('title')
    }

    const allIngredients = await knex('ingredients')
    const platesWithIngredients = plates.map(plate => {
      const plateIngredient = allIngredients.filter(ingredient => ingredient.plate_id === plate.id)

      return {
        ...plate,
        ingredients: plateIngredient
      }
    })

    return response.status(200).json(platesWithIngredients)
  }
}

module.exports = PlatesController