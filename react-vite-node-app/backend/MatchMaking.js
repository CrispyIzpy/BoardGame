export async function matchMaking(redisClient, userId) {
    console.log("Started matchmaking: " + userId);
    await redisClient.zAdd("match:queue", {
        score: Date.now(), // join time
        value: String(userId),
    });

    const queueLength = await redisClient.zCard("match:queue");
    if (queueLength > 1) {
        const players = await redisClient.zPopMin("match:queue", 2);
        console.log("Match made");
        return "Found match";
    }
    return "Entered matchmaking";
}
