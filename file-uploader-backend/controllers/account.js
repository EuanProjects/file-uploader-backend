const asyncHandler = require("express-async-handler");

exports.getAccount = asyncHandler(async (req, res) => {
    res.json({ id: req.user.id });
})