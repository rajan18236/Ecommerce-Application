var jwt = require('jsonwebtoken');

const getToken = (userId) => {
    const accessToken = jwt.sign({ id:userId }, process.env.JWT_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id:userId }, process.env.JWT_KEY, { expiresIn: "7d" })
    return ({accessToken, refreshToken})
}

module.exports = getToken