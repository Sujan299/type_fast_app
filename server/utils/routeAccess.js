const access = (req, res)=>{
    res.status(200).json({message: "You have accessed to it !"})
}


module.exports = {access};