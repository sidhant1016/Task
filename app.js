require('dotenv').config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const redis = require("redis")
const bodyParser = require('body-parser');
require("./redisClient")
require("./models");
var studentCtrl = require("./Controler/studentControl");
var bookCtrl = require("./Controler/bookControl");
const redisClient = redis.createClient({ host: process.env.REDIS_host, port: process.env.REDIS_port });
const port = 8222;
// middleware
app.use(express.json())
app.use(bodyParser.json())

// routes of student table
app.get("/add",studentCtrl.createStudent)
app.get("/students",studentCtrl.getStudents)
app.post('/students/post', studentCtrl.postStudent)
app.delete("/students/:id",studentCtrl.deleteStudent)
app.put("/students/:id",studentCtrl.updateStudent)

// routes of book table

app.get("/books",bookCtrl.addBook)

app.put("/books/:id",bookCtrl.updateBook)






// generate token and store
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (username === "ram" && password === "987654321") {
    const access_token = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
    const refresh_token = jwt.sign({ username: username }, process.env.ACCESS_REFRESH_SECRET, { expiresIn: process.env.ACCESS_REFRESH_TIME })

    redisClient.set(refresh_token, username, 'EX', process.env.ACCESS_REFRESH_TIME);

    res.status(200).json({ access_token, refresh_token })
  } else {
    res.status(400).json({ message: "Invalid Credentials" })
  }

})

app.post("/protected", (req, res) => {
  const refreshToken = req.body.refreshToken;

  jwt.verify(refreshToken, process.env.ACCESS_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Invalid refresh token" });
    } else {
      const username = decoded.username;

      // Generate a new JWT token with a shorter expiration time
      const token = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

      // Send the new JWT token in the response
      res.json({ token });
    }
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
