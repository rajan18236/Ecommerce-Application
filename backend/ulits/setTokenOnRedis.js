const redis = require("../config/redisConfig")
const setTokenOnRedis = async (userId, refreshToken) => {
    await redis.set(`refreshToken:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60)
}

const removeTokenFromRedis = async (userId) => {
    await redis.del(`refreshToken:${userId}`)
}

// const getTokenFromRedis = async (userId)=>{
//     await redis.get(`refreshToken:${userId}`)
// }

module.exports = {setTokenOnRedis,removeTokenFromRedis}