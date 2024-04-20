const { compare } = require('../../helpers/handleBcrypt')
const { tokenSign } = require('../../helpers/generateTokens')
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const prismaClient = new PrismaClient();


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
    const { username, email, city, country, password, investor, url, imageUrl } = req.body
    // check if user is already registered
    const user = await prismaClient.user.findUnique({
      where: {
        email: username
      }
    })
    
    if (user) {
      res.status(409)
      res.send({ error: 'User already exist' })
      return
    }
    
    
    const passwordEncrypted = await bcrypt.hash(password, saltRounds);
    /// username deberia de ser name , en el excel
    const registerUser = await prismaClient.user.create({
      data: {
        name: username,
        email: email,
        city: city,
        country: country,
        password: passwordEncrypted,
      }

    })

    if (investor) {
      const investor = await prismaClient.investor.create({
        data: {
          id: registerUser.id,
          mensual_votes: 10

        }
      })
    } else {
      const entrepeneur = await prismaClient.entrepeneur.create({
        data: {
          id: registerUser.id,
          mensual_tickets: 10

        }
      })
    }

    res.send({
      msg: "User created succefully",
      id: registerUser.id,
      name: registerUser.name,
      email: registerUser.email
    })

  } catch (e) {
    res.status(404)
    res.send({ error: 'Invalidad data' ,e})
  }
}

module.exports = { loginCtrl, registerCtrl }