const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")
const cookieParser = require("cookie-parser")
// socket
const { Server } = require("socket.io")
const { createServer } = require("node:http");
const authSocketUser = require("./middlewares/authSocketUser")
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://type-fast-app.onrender.com/",
        method: ["GET", "POST"],
        credentials: true
    }
});

const handleSocketEvents = require("./controllers/socketController");
const publicSocket = require("./controllers/publicSocket")
publicSocket(io)
const privateIo = io.of("/private");
privateIo.use(authSocketUser);  // Apply authentication only here
handleSocketEvents(privateIo);  //

app.use(cors({
    origin: "https://type-fast-app.onrender.com/",
    method: ["GET", "POST"],
    credentials: true
}))

dotenv.config();
// parse body only before routes then routes will get parsed data.
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;

const loginRoutes = require("./routes/loginRoutes");
const connection = require("./config/db");
const achivementRoutes = require("./routes/achivementRoutes");
const historyRoutes = require("./routes/historyRoutes");
const roomRoutes = require("./routes/roomRoutes");
const publicRoutes = require("./routes/publicRoutes");


// public routes
app.use("/", publicRoutes)


// protected routes
app.use("/auth", loginRoutes);
app.use("/achivement", achivementRoutes)
app.use("/history", historyRoutes)
app.use("/room", roomRoutes)

connection();

server.listen(PORT, () => {
    console.log(` I am running on port no : ${PORT}`)
})