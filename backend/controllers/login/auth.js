const { encrypt, compare } = require('../../helpers/handleBcrypt')
const { tokenSign } = require('../../helpers/generateTokens')
const { PrismaClient } = require('@prisma/client')

const prismaClient = new PrismaClient();

//TODO: Login!
const loginCtrl = async (req, res) => {
  try {
    const { username, password } = req.body

    username == undefined ? "" : username


    const user = await prismaClient.user.findUnique({
      where: {
        email: username
      }
    })


    if (!user) {
      res.status(404)
      res.send({ error: 'User or password not found' })
      return
    }

    const checkPassword = await compare(password, user.password)


    if (checkPassword) { //TODO Contraseña es correcta!

      const payload = {
        userId: user.id,
        type: "Ejemplo de un tipo de usuario",
        username: user.email

      }
      const tokenSession = await tokenSign(payload) //TODO: 2d2d2d2d2d2d2
      res.send({
        ...payload,
        tokenSession
      })
      return
    } else {

      res.status(409)
      res.send({
        error: 'User or password not found'
      })
      return
    }

  } catch (e) {
    res.status(404)
    res.send({ error: 'User or password not found',
  e })
  }
}



module.exports = { loginCtrl }