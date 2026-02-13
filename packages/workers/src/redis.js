"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
// packages/workers/src/redis.ts
var redis_1 = require("redis");
exports.redis = (0, redis_1.createClient)({
    url: process.env.REDIS_URL
});
await exports.redis.connect();
