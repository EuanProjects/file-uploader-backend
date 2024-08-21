const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file");

const multer  = require('multer');
const { getToken, verifyToken } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage: storage })

router.use(getToken, verifyToken);

// create file
router.post("/", upload.array('images'), fileController.postFiles);
// read file
router.get("/:fileId", fileController.getFile);

// update file
router.put("/", (req,res) => res.send("Hello file update"));

// delete file
router.delete("/", (req,res) => res.send("Hello file delete"));


module.exports = router;