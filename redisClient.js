const redis = require("redis");
const redisclient = redis.createClient();
  
(async () => {
    await redisclient.connect();
})();
  
console.log("Connection establish");
  
redisclient.on("ready", () => {
    console.log("Connected!");
});
  
redisclient.on("error", (_err) => {
    console.log("Error in the Connection");
});