const public = async (req, res)=>{
    try{
        res.status(200).json({message: "You accessed public resources!"})
    }catch(err){
        console.log("Error while accessing public page !", err)
    }
}

module.exports = {public}