const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class OrdersController {
  async create(request, response) {
    const { details, total_price, status } = request.body
    const { id } = request.params

    if(!details || !total_price || !status) {
      throw new AppError('Preencha todas as informações!')
    }

    await knex('order-history').insert({
      user_id: id,
      status,
      details,
      total_price
    })

    return response.status(200).json()
  }

  async index(request, response) {
    const { id } = request.query

    let orders

    if(id) {
      orders = await knex('order-history').where({ user_id: id })
    } else {
      orders = await knex('order-history')
    }

    return response.status(200).json(orders)
  }
}

module.exports = OrdersController