const jwt = require("jsonwebtoken")

function getToken(user){
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        }
    )
    return token;
}

module.exports = {getToken}