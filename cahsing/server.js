import redis from "./cache.js";

async function redisChecks() {
   try {
    await redis.set('name','ritam')
    console.log('====================================');
    console.log('sucessfully added');
    console.log('====================================');
   } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
   }
}

redisChecks()