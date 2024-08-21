const jwt = require("jsonwebtoken");

module.exports.getToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports.verifyToken = (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            req.user = authData;
            next();
        }
    })
}