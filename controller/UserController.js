
exports.getUser = (req, res, next) => {
    res.send(`this is userInfo page || ${JSON.stringify(req.user)}`);
}