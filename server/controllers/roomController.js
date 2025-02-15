const Room = require("../models/roomSchema");
const room = async (req, res) => {
    try {
        const { id } = req.userData;
        const rooms = await Room.findOne({ owner: id });
        if (!rooms) {
            return res.status(400).json({ message: "No room created yet !" })
        }
        res.status(201).json({ rooms });
    } catch (err) {
        console.log("Error when finding room", err)
    }
}
const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};
const create_room = async (req, res) => {
    try {
        const { id } = req.userData;
        const { name } = req.body;

        const room = await Room.findOne({name: name})
        if(room){
            return res.status(400).json({message: `Room : ${name} already exists !`})
        }
        let roomCode;
        do{
            roomCode = generateRoomCode();
        }while(await Room.findOne({roomCode: roomCode}))
        const newRoom = new Room({
            name: name,
            roomCode: roomCode,
            owner: id

        })
        await newRoom.save();

        res.status(201).json({newRoom})

    } catch (err) {
        console.log("Error while creating room !", err)
    }
}


module.exports = { room, create_room };