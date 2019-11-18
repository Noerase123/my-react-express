const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const jwt_key = 'pizza'
    try {
        const token = req.headers.authorization
        console.log(token)
        const decoded = jwt.verify(req.body.token, jwt_key)
        req.userData = decoded
    }
    catch (err) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}