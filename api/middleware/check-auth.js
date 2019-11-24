const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const jwt_key = 'pizza'
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, jwt_key)
        req.userData = decoded
        next()
    }
    catch (err) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}