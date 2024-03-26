require("dotenv").config();

const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const routes = require("./routes/index");
const dashboardRoute = require("./routes/dashboard");
const connectDB = require("./config/db");

const app = express();
const PORT = 8080 || process.env.PORT;

//body parser
app.use(express.urlencoded({ extended: true })); // parse incoming reqst from post reqst in body parser
app.use(express.json()); // parse incoming reqst in json

connectDB();

//view engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//static files
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/", routes);
app.use("/", dashboardRoute);

// error page
app.get("*", (req, res) => {
  res.status(404).render("error");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
