const express = require("express");
const router = express.Router();

// load controller
const folderController = require("../controllers/folder");
const { getToken, verifyToken } = require("../middleware/authMiddleware");

router.use(getToken, verifyToken)

// create folder
router.post("/", folderController.postFolder);

// read folder
router.get("/", folderController.getFolders);

// update folder
router.put("/:folderId", folderController.updateFolder);

// delete folder
router.delete("/:folderId", folderController.deleteFolder);


module.exports = router;