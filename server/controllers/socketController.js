const Room = require("../models/roomSchema");
const User = require("../models/userModel");
const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};
const create_room = async (obj, sid, socket) => {
    // console.log(obj);
    try {
        const { roomName, userId } = obj;
        let roomCode;
        do {
            roomCode = generateRoomCode();
        } while (await Room.findOne({ roomCode: roomCode }))

        const newRoom = new Room({
            name: roomName,
            roomCode: roomCode,
            owner: userId,
            participants: [
                {
                    user: userId,
                    socketId: sid,
                    progress: 0,
                    wpm: 0
                },
            ]
        })
        await newRoom.save();
        // res.status(201).json({newRoom});
        console.log(`${sid} created room of code: ${roomCode}`)
        socket.emit("sendingRoom", newRoom)
    } catch (err) {
        console.log("Error creating room !", err)
    }
}
// to leave user will click, leave button and send its userId , roomCode and socket.id
const removeParticipants = async (data, socket) => {
    let room = await Room.findOne({ roomCode: data.roomCode });
    if (room) {
        room.participants = room.participants.filter(p => p.user.toString() !== data.userId);
        await room.save();
    }
    socket.leave(data.roomCode);
    console.log(`${data.userId} left the room : ${data.roomCode}`)
}

const joinRoom = async (data, io, socket) => {
    try {
        const { roomCode, userId } = data;
        const room = await Room.findOne({ roomCode: roomCode });
        if (!room) {
            return console.log("Room is not found")
        }
        const isUserInRoom = room.participants.some(participant => participant.user.toString() === userId);
        if (!isUserInRoom) {
            room.participants.push({ user: userId, socketId: socket.id });
            await room.save();
        }
        console.log(isUserInRoom)
        socket.join(roomCode);
        io.emit("updateInterface", room)
        console.log(`${userId} joined room : ${roomCode}`);
    } catch (err) {
        console.log("Error while joining the room !", err)
    }
}

const setDataAndResponse = (socket) => {
    const sentence = "Justin bieber is the biggest person in the world!";
    socket.emit("send-sentence", sentence);
}
const userProgress = async (data, socket) => {
    const { roomCode, userId, progress, wpm } = data;
    try {
        console.log(roomCode);
        const room = await Room.findOneAndUpdate(
            { roomCode, "participants.user": userId },
            {
                $set: {
                    "participants.$.wpm": wpm,
                    "participants.$.progress": progress
                }
            },
            { new: true }
        );
        // Check if room is not found
        if (!room) {
            return console.log("Room not found or participant not found in the room");
        }
        const sortedArr = room.participants.sort((a, b) => b.progress - a.progress);
        // Emit updated room data
        socket.emit("leaderBoardResult", sortedArr);
    } catch (error) {
        console.error("Error updating room progress:", error);
    }
}
const endOfRace = async (data, socket) => {
    const roomCode = data;
    try {
        const updatedRoomStatus = await Room.findOneAndUpdate(
            { roomCode },
            { $set: { isActive: false } }, // Set isActive to false
            { new: true }
        );
        socket.emit("statusOfRoom", updatedRoomStatus.isActive);
    } catch (err) {
        console.log("Error while trying to end race !", err)
    }
}
const getAuser = async (roomCode, socket) => {
    try {
        console.log(roomCode)
        // Fetch the room from the database if it's not provided
        const room = await Room.findOne({ roomCode });

        // Check if the room exists
        if (!room) {
            console.log("Room not found for code:", roomCode);
            return socket.emit("sendAuser", []); // Send an empty array to the client
        }

        console.log("Room Data:", room);

        let usersArray = []; // Initialize an array to store users

        // Use Promise.all to fetch all users
        const users = await Promise.all(
            room.participants.map(async (item) => {
                const user = await User.findById(item.user);
                if (!user) {
                    console.log("User not found:", item.user);
                    return null; // Ignore missing users
                }

                // Only add users who have both username and image
                if (user.username && user.image) {
                    return {
                        username: user.username,
                        image: user.image
                    };
                } else {
                    return null; // Ignore users with missing data
                }
            })
        );

        // Remove null values and store in usersArray
        usersArray = users.filter(user => user !== null);

        console.log("Final Users Array:", usersArray);

        // Emit the final users array to the client
        socket.emit("sendAuser", usersArray);
    } catch (err) {
        console.log("Cannot get users", err);
    }
};



// handleSocketEvents
const handleSocketEvents = (io) => {
    io.on("connection", (socket) => {
        console.log(`${socket.id} connected`)
        console.log("Hello world")
        socket.on("create-room", (obj) => {
            const sid = socket.id;
            create_room(obj, sid, socket)
            console.log(socket.userData)
        });
        socket.on("joinRoom", (data) => {
            joinRoom(data, io, socket)
        });

        socket.on("leaveRoom", (data) => {
            removeParticipants(data, socket)
        })
        socket.on("askForContent", () => {
            setDataAndResponse(socket);
        })
        socket.on("getAllUsers", (room) => {
            // console.log(room)
            getAuser(room, socket)
        })
        socket.on("userProgress", (data) => {
            userProgress(data, socket);
        })
        socket.on("endOfRace", (data) => {
            endOfRace(data, socket)
        })
        // this executes actually when page is cut
        socket.on("disconnect", () => {
            console.log(`${socket.id} disconnected !`)
        })
    })

}
module.exports = handleSocketEvents