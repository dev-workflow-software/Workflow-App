const database = require('./');

const DocumentType = database.model('DocumentType',{
    description:String,
    order:Number,//TODO: event handler for updated order, this needs to be sent to the event bus
})

const User = database.model('User',{
    name: String,
    identityToken: String,
    identityProvider: String,
});

const Document = database.model('documents',{
    description: String,
    documentType: String,//DocumentType._id
    creator: String,//User._id
})
const DocumentProcessingRules = database.model('DocumentProcessingRules',{
    documentType: String,//documentType._id
    allowedActions: Array,
});

module.exports = {Document};