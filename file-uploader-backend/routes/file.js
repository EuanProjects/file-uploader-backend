const express = require("express");
const router = express.Router();

// load controller


// create file
router.post("/", (req,res) => res.send("Hello file post"));

// read file
router.get("/", (req,res) => res.send("Hello file get"));

// update file
router.put("/", (req,res) => res.send("Hello file update"));

// delete file
router.delete("/", (req,res) => res.send("Hello file delete"));


module.exports = router;