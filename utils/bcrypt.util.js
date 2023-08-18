const bcrypt = require("bcrypt");

const saltRounds = 10;

function hashedPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashedPassword,
    comparePassword,
}