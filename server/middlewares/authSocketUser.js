const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const authSocketUser = (socket, next) => {
  const token = socket.handshake.auth.token;
  // const token = .cookies.uid;
  // const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  // const token = cookies.token; // Extract token from cookies
  // console.log(token)
  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    socket.userData = decoded;
    next(); 
  } catch (err) {
    return next(new Error("Authentication error: Invalid or expired token"));
  }
};

module.exports = authSocketUser;
