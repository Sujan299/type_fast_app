const jwt = require("jsonwebtoken");

const authUser = (req, res, next)=>{
    // token is sent through header from client
    // using localStorage and get data here 
    // const token =  req.headers.authorization?.split(" ")[1]; // separated Bearer and <token> and recieved token

    // cookie 
    const token = req.cookies.uid;
    if(!token) return res.status(401).json({message: "Access denied !"})
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // we get decoded payload here, eg id, email
        // console.log(decoded);
        req.userData = decoded;
        next();
    }catch(err){
        res.status(500).json({message: "Invalid token"})
    }
}

module.exports = authUser;