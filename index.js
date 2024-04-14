const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // Use this after the variable declaration
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.get("/", (req, res) => {
  return res.render("index");
});

app.use("/urls", require("./routes/urls"));

app.listen(port, () => {
  console.log(`App is listening on port http://${host}:${port}`);
});
