const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client")
const accountController = require("../controllers/account");
const { isAuth } = require("../middleware/authMiddleware");

const prisma = new PrismaClient()

// load controller

// create account
router.post("/", async (req, res, next) => {

    const accounts = await prisma.account.findUnique({
        where: {
            username: req.body.username
        }
    })

    if (accounts) {
        return res.status(400).send('Profile already exists');
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
            const newAccount = await prisma.account.create({
                data: {
                    username: req.body.username,
                    password: hashedPassword,
                }
            })
            res.send('Profile created successfully');
        } catch (err) {
            return next(err);
        };
    })
});

router.use(isAuth)

// read account
router.get("/", accountController.getAccount);

// update account
router.put("/", (req, res) => res.send("Hello account update"));

// delete account
router.delete("/", (req, res) => res.send("Hello account delete"));


module.exports = router;