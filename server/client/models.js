const database=require('../database');

const Client = database.model('clients',{
    key:String,
    creator:String,
})


module.exports = {Client};