import jwt from 'jsonwebtoken'

module.exports = (req, res, next) => {
    console.log('got executed')
    try {
        console.log({req})
        const token = req.headers.cookie.split('=')[1]
        const decoded = jwt.verify(token, 'secrete')
        console.log({decoded})
        req.userData = decoded
        next()
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
}