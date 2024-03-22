require("dotenv").config();

const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const routes = require("./routes/index");

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.urlencoded({ extended: true })); // parse incoming reqst from post reqst in body parser

app.use(express.json()); // parse incoming reqst in json

//view engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
