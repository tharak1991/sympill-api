module.exports = {
    getDashboard: function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            res.status(200).send({
                success: true,
                message: "Token Valid!"
            });
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    }
}