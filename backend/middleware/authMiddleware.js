const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        
        let token = req.headers.authorization;
        if (!token) {
            res.status(401).json({message: "No token, authorization denied" });
        }

        token = token.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select("-pasword");
        next()

    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

module.exports = protect;