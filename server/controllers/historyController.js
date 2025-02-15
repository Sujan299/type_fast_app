const History = require("../models/historySchema");

const history = async (req, res) => {
    try {
        const { id } = req.userData;
        const history = await History.findOne({user: id});
        if(!history){
            return res.status(400).json({message: "No history yet !"})
        }
        res.status(201).json({history});
    } catch (err) {
        console.log("Error while finding achievements !", err)
    }
}

module.exports = {history};