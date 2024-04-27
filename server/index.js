console.log(`${new Date()}: Initialise`);
require('dotenv').config();
// const { Document } = require('./database/models');
const registerClient = require('./client/register');
var cors = require('cors')
const app = require('express')();
app.use(cors()); 

require('./database');

// app.get('/documents/', async (req, res) => {
//     const limit = req.query.limit ? req.query.limit : 50;
//     const skip = req.query.skip? req.query.skip : 0;
//     const docs = await Document.find({},null,{limit,skip});
//     const count = await Document.countDocuments();
//     res.send({data:docs,limit,skip,count});
// })

app.use("/",registerClient.router);

const port = 8000;
app.listen(port, () => {
    console.log(`${new Date()}: Example app listening on port ${port}`);
}); 
