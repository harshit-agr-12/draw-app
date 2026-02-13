// packages/workers/src/redis.ts
import { createClient, RedisClientType } from "redis";

export const redis : RedisClientType = createClient({
    url : process.env.REDIS_URL
});

await redis.connect();