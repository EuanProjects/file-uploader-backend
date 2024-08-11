const express = require("express");
const router = express.Router();

// load controller


// create folder
router.post("/", (req,res) => res.send("Hello folder post"));

// read folder
router.get("/", (req,res) => res.send("Hello folder get"));

// update folder
router.put("/", (req,res) => res.send("Hello folder update"));

// delete folder
router.delete("/", (req,res) => res.send("Hello folder delete"));


module.exports = router;