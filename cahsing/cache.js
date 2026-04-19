import Redis from 'ioredis'
import dptenv from 'dotenv'

dptenv.config()
console.log(process.env.REDIS_HOST);
console.log(process.env.REDIS_PASSWORD);
console.log(process.env.REDIS_PORT);

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    
})


redis.on("connect", () => console.log("Redis connected"))
redis.on("error", (err) => console.log(err))

export default redis