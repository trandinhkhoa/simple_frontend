const express = require("express")
const path = require("path")

const app = express();

const PORT = 8080;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
})