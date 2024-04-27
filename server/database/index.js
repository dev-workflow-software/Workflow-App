const mongoose  = require("mongoose");

const connectDatabase = async ()=>{
    const databaseURL = `mongodb+srv://${encodeURIComponent(process.env.APP_DATABASE_USER)}:${encodeURIComponent(process.env.APP_DATABASE_PASS)}@${encodeURIComponent(process.env.APP_DATABASE_URL)}/${encodeURIComponent(process.env.APP_DATABASE_NAME)}`;
    console.log(`${new Date()}: Connecting to mongoDB`);
    await mongoose.connect(databaseURL);
    console.log(`${new Date()}: Connected to mongoDB`);
}

connectDatabase().catch(e=>{
    console.error(`${new Date()}: Unable to connect to mongoDB. Error: ${e}`);
}); 

module.exports = mongoose;