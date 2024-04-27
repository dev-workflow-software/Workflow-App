const database = require('./');

const User = database.model('Users',{
    name: String,
    githubId: Number,
    clients: [String],
    tokens: [{token:String,client:String}],
    lastLogin: Date,
});
module.exports = {User};