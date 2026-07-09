var jwt = require('jsonwebtoken');

const getToken = (userId) => {
    const accessToken = jwt.sign({ id:userId }, process.env.JWT_KEY_AT ,//{expiresIn: "15h" }

    );
    const refreshToken = jwt.sign({ id:userId }, process.env.JWT_KEY_RT, { expiresIn: "7d" })
    return ({accessToken, refreshToken})
}

module.exports = getToken