const validateUser = (schema)=> async (req, res, next)=>{
    try{
        const parseBody = await schema.parseAsync(req.body);
        // whatever I havae parseAsync here that feilds will be only passed to controller where signup will be saved.
        // req.body = parseBody;
        next();
    }catch(err){
        console.log(err, "Zod error !");
    }
}

module.exports = validateUser;