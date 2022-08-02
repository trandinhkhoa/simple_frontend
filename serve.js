const express = require("express")

const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  res.send({ message: "Welcome to my test server" });
})

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
})