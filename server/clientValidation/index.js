// require('dotenv').config();
const express = require('express');
const router=express.Router() 
const bodyParser = require('body-parser');
const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
const uuid  = require('uuid');
const database=require('../database');

const RegisteredClients = database.model('RegisteredClients',{
    key:String,
    creator:String,
})

class RegKey {
    constructor(key,creator){
        this.key = key;
        this.creator = creator;
        this.expires = new Date(new Date().getTime() + process.env.APP_EXPIRY_REGISTRATION_KEY_MINUTES*60*1000);
    }
}
const regKeys = [];
const regKeys_cleanup = () => {
    regKeys.forEach((e,i)=>{if (e.expires <= new Date()){
        console.log(`${new Date()}: Registration key [${e.key}] expired. Deleting . . .`);
        regKeys.splice(i,1);
    }});
};
setInterval(regKeys_cleanup,1000);

const generateNewKey = async () => {
    const key = uuid.v4();
    const rec = await RegisteredClients.findOne({key});
    return rec ? generateNewKey() : key;
};

readline.on('line',async (input)=>{
    switch(input){
        case 'registerClient':{ 
            regKeys.push(new RegKey(await generateNewKey(),"console"));
            console.log(`Registration key: ${regKeys[regKeys.length-1].key}\r\nExpires: ${regKeys[regKeys.length-1].expires}`);
        }
    }
});

router.post('/registerClient',bodyParser.json(),async(req,res)=>{
    if(!req.body || !req.body.registrationKey){
        res.sendStatus(400);
        return;
    }
    const key = regKeys.find(e => e.key == req.body.registrationKey && e.expires > new Date());
    if (!key) {
        res.sendStatus(404);
        return;
    }
    
    console.log(`${new Date()}: Registration key [${key.key}] consumed. Deleting . . .`);
    regKeys.splice(regKeys.indexOf(key),1);
    const newClient = await RegisteredClients.create({key:key.key,creator:key.creator});
    if (!newClient){
        res.sendStatus(500);
        return;
    }
    
    res.status(201);
    res.send({key});
})
router.post('/validateClient',bodyParser.json(),async(req,res)=>{
    if(!req.body || !req.body.clientKey){
        res.sendStatus(400);
        return;
    }
    const client = await RegisteredClients.findOne({key:req.body.clientKey});
    if(client){
        res.sendStatus(200);
        return;
    }
    res.sendStatus(403);
})
  
// Importing the router 
module.exports={router};