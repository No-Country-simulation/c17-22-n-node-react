const bcrypt = require('bcrypt')


const compare = async (passEncry, pass) => {
    return bcrypt.compare(passEncry, pass) // TODO: encryptar
}

module.exports = { compare }