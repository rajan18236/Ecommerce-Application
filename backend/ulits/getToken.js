var jwt = require('jsonwebtoken');

const getToken = (userId) => {
    const accessToken = jwt.sign({ id:userId }, process.env.JWT_KEY, { expiresIn: 15 * 60 * 1000 });
    const refreshToken = jwt.sign({ id:userId }, process.env.JWT_KEY, { expiresIn: 7 * 24 * 60 * 60 })
    return ({accessToken, refreshToken})
}

module.exports = getToken