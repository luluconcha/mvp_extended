var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors"); // add at the top

var authRouter = require("./routes/auth");
var characterRouter = require("./routes/characters");
var storyRouter = require("./routes/storypoints");



var app = express();
app.use(cors()); // add after 'app' is created

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/characters", characterRouter);
app.use("/api/storypoints", storyRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/dist/index.html"));
  });








app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send("error");
  });

module.exports = app;
