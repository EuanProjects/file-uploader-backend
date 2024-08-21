const asyncHandler = require("express-async-handler");

exports.getAccount = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const username = req.user.username;
    res.json({ id, username });
})