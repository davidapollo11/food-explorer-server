const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const knex = require('../database/knex')

class UsersController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body

    if(!name || !email || password.lenght < 6) {
      throw new AppError('Não foi possível cadastrar, tente novamente.', 400)
    }

    const checkUserExists = await knex('users').where({ email }).first()

    if(checkUserExists) {
      throw new AppError('Este e-mail já está cadastrado.')
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
      is_admin: isAdmin
    })

    return response.json()
  }

  async update(request, response) {
    const { name, email, password, old_password, isAdmin } = request.body
    const { id } = request.params
    
    const user = await knex('users').where({ id }).first()
    console.log(id, user)

    if(!user) {
      throw new AppError('Não é possível atualizar!')
    }

    const userWithUpdatedEmail = await knex('users').where({ email }).first()
    console.log(userWithUpdatedEmail)
    
    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este e-mail já está sendo utilizado, tente novamente.', 400)
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.is_admin = isAdmin ?? user.is_admin

    if(password && !old_password) {
      throw new AppError('Por favor, informe a senha antiga.')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError('Ops! A senha antiga não confere.')
      }

      user.password = await hash(password, 8)
    }

    await knex('users').where({ id }).update(user)

    return response.status(200).json(user)
  }
}

module.exports = UsersController