const { compare } = require('../../helpers/handleBcrypt')
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


    if (checkPassword) {

      const payload = {
        userId: user.id,
        username: user.email

      }
      const tokenSession = await tokenSign(payload)
      res.send({
        id: user.id,
        name: user.name,
        username: user.email,
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
    res.send({ error: 'User or password not found' })
  }
}

const registerCtrl = async (req, res) => {
  try {
    const { username, city, country, password, email, investor, url, imageUrl } = req.body

    // const passwordHash = await encrypt(password) //TODO: (123456)<--- Encriptando!!
    const registerUser = await prismaClient.user.create({
      data: { 
        name: username,
        email: email, 
        city: city ,
        country: country,
        password: password,
      }

    })

    res.send({ data: registerUser })

  } catch (e) {
    res.status(404)
    res.send({ error: 'Invalidad data'})
  }
}

module.exports = { loginCtrl, registerCtrl }