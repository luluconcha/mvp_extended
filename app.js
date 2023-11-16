var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors"); // add at the top

var characterRouter = require("./routes/characterSheet");
var classRouter = require("./routes/characterClass");
var inventoryRouter = require("./routes/inventory");
var listRouter = require("./routes/inventoryList");
var typeRouter = require("./routes/type");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors()); // add after 'app' is created

app.use("/api/character", characterRouter);
app.use("/api/class", classRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/inventoryList", listRouter);
app.use("/api/type", typeRouter);

module.exports = app;
