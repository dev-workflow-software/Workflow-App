const mongoose  = require("mongoose");

const connectDatabase = async ()=>{
    const databaseURL = `mongodb+srv://${encodeURIComponent(process.env.APP_DATABASE_USER)}:${encodeURIComponent(process.env.APP_DATABASE_PASS)}@${encodeURIComponent(process.env.APP_DATABASE_URL)}/${encodeURIComponent(process.env.APP_DATABASE_NAME)}`;
    console.debug(`Connecting to ${databaseURL}`);
    await mongoose.connect(databaseURL);

}

connectDatabase().catch(console.err); 

module.exports = mongoose;