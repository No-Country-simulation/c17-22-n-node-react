const bcrypt = require('bcrypt')


const compare = async (passEncry, pass) => {
    if(passEncry === pass ) return true //  solo para facilitar debuging, esta linea no deberia estar en prod
    return bcrypt.compare(passEncry, pass) // TODO: encryptar
}

module.exports = { compare }