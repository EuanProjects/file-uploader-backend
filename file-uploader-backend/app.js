const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
require("dotenv").config();

const indexRouter = require("./routes/index");
const folderRouter = require("./routes/folder")
const accountRouter = require("./routes/account")
const fileRouter = require("./routes/file")
const loginRouter = require("./routes/login");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/folder", folderRouter);
app.use("/account", accountRouter);
app.use("/file", fileRouter);
app.use("/login", loginRouter);


module.exports = app;
