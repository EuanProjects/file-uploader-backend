const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { PrismaClient } = require('@prisma/client');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const cors = require('cors');
require("dotenv").config();

const indexRouter = require("./routes/index");
const folderRouter = require("./routes/folder");
const accountRouter = require("./routes/account");
const fileRouter = require("./routes/file");
const loginRouter = require("./routes/login");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



const prisma = new PrismaClient()
passport.serializeUser((user, done) => {
    done(null, user.id);
});



app.use(passport.initialize());

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.account.findUnique({
            where: {
                id: id,
            },
        });

        done(null, user);
    } catch (err) {
        console.error("Error deserializing user:", err);
        done(err);
    }
});


passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await prisma.account.findUnique({
                where: {
                    username: username,
                },
            });
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);


// app.use((req, res, next) => {
//     console.log(req.user);
//     next();
// })

app.use("/", indexRouter);
app.use("/folder", folderRouter);
app.use("/account", accountRouter);
app.use("/file", fileRouter);
app.use("/login", loginRouter);

module.exports = app;
