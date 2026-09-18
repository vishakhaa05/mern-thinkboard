import "dotenv/config";

console.log(
    "Upstash URL loaded:",
    !!process.env.UPSTASH_REDIS_REST_URL
);

console.log(
    "Upstash Token loaded:",
    !!process.env.UPSTASH_REDIS_REST_TOKEN
);

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;