const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({
                message: 'Access Denied. No Token Provided.'
            });
        }
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            req.user = verified;
            console.log(verified);
            next();
        } else {
            return res.status(401).json({
                message: 'Access Denied. Invalid Token Provided.'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Access Denied. Error occurred.',
            error: error.message
        });
    }
}
module.exports = verifyToken