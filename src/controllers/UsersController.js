const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const knex = require('../database/knex')

class UsersController {
  async create(request, response) {
    const { name, email, password, is_admin } = request.body

    const checkUserExists = await knex('users').where({ email }).select('email')

    if(checkUserExists.lenght === 1) {
      throw new AppError('Esse e-mail já está cadastrado!')
    }

    const hashPassword = await hash(password, 8)

    await knex('users').insert({ name, email, password: hashPassword, is_admin })

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, old_password, password, is_admin } = request.body
    const { id } = request.params

    const fetchUser = await knex('users').where({ id })
    const [ user ] = fetchUser

    if(!user) {
      throw new AppError('Usuário não encontrado!')
    }

    const emailExists = await knex('users').where({ email })

    //if there is an email and it is not the same as the body of the request
    if(emailExists.length === 1 && email !== user.email) {
      throw new AppError('Este e-mail já está sendo usado!')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.is_admin = is_admin ?? user.is_admin

    if(password && !old_password) {
      throw new AppError('Informe a senha antiga!')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError('A senha antiga não confere!')
      }

      user.password = await hash(password, 8)
    }

    await knex('users').where({ id }).update({ ...user })

    return response.status(200).json()
  }
}

module.exports = UsersController