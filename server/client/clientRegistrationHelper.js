const uuid  = require('uuid');
const { Client } = require('./models');

class RegKey {
    constructor(key,creator,expires = null){
        this.key = key;
        this.creator = creator;
        if(!expires){
            expires = new Date(new Date().getTime() + process.env.APP_EXPIRY_REGISTRATION_KEY_MINUTES*60*1000);
        }
        this.expires = expires;
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
    const rec = await Client.findOne({key});
    return rec ? generateNewKey() : key;
};

module.exports = {RegKey,regKeys,generateNewKey}