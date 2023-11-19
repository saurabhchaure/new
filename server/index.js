const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
let ejs = require("ejs");
const app = express();
const port = 8080;

// local quotes
const quotes = require("./public/assets/quotes.json");
const config = require("./public/assets/config.json");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/config(.json)", (req, res) => {
  res.send(config);
});

// app.get("/tracker", (req, res) => {
//   res.render("tracker", { quotes, config });
// });
// app.get("/history", (req, res) => {
//   res.render("history.ejs");
// });
// app.get("/config", (req, res) => {
//   res.render("config.ejs");
// });
// app.get("/faq", (req, res) => {
//   res.render("faq.ejs");
// });
// app.get("/profile", (req, res) => {
//   res.render("profile.ejs");
// });

app.listen(port, (req, res) => {
  console.log("Server is running!");
});
