const {Client } = require("../client/models");


module.exports = (errCode) =>{  
    return async (req,res,next)=>{
        const clientKey = req.query.clientKey;
        
        if(!clientKey){
            res.sendStatus(errCode);
            return;
        }
        const rec = await Client.findOne({key:clientKey});
        if(!rec){
            res.sendStatus(403);
            return;
        }

        next();
    }
    
};