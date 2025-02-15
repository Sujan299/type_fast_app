const Achievement = require("../models/achivementsSchema");

const achivement = async (req, res) => {
    try {
        const { id } = req.userData;
        const achievements = await Achievement.findOne({user: id});
        if(!achievements){
            return res.status(400).json({message: "No achievements yet !"})
        }
        res.status(201).json({achievements});
    } catch (err) {
        console.log("Error while finding achievements !", err)
    }
}

module.exports = {achivement};