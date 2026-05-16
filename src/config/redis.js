const redis = require('redis');

const redisUrl = process.env.UPSTASH_URL || process.env.REDIS_URL;

const redisClient = redis.createClient({
  url: redisUrl,
});

redisClient.on('error', (err) => {
  console.log('Redis Error: ', err);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis Connected');
  } catch (error) {
    console.log('Redis connection failed: ', error.message);
  }
};

module.exports = { redisClient, connectRedis };
