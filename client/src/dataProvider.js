import customers from "./data/customers";
import documents from "./data/documents";
import stages from "./data/stages";
import users from "./data/users";

const dataProvider = {
    // get a list of records based on sort, filter, and pagination
    getList:    (resource, params) => {
        console.log({getList:{resource,params}});
        switch(resource){
            case 'documents': return Promise.resolve({data:documents,   total:documents.count});
            case 'customers': return Promise.resolve({data:customers,   total:customers.count});
            case 'users': return Promise.resolve({data:users,   total:users.count});
            case 'stages'   : return Promise.resolve({data:stages,      total:stages.count});
            default:
                return Promise.reject()
        }
    },
    // get a single record by id
    getOne:     (resource, params) => {
        console.log({getOne:{resource,params}});
        switch (resource) {
            case 'documents' : return Promise.resolve({data:documents.find(document => document.id ===    params.id)});
            default : return Promise.rejec();
        }
    }, 
    // get a list of records based on an array of ids
    getMany:    (resource, params) => {
        console.log({getMany:{resource,params}})
        switch(resource){
            case 'stages': return Promise.resolve({data:stages});
            case 'customers': return Promise.resolve({data:customers});
            case 'users': return Promise.resolve({data:users});
            default : return Promise.reject();
        }
        
    }, 
    // get the records referenced to another record, e.g. comments for a post
    getManyReference: (resource, params) => Promise.resolve(), 
    // create a record
    create:     (resource, params) => Promise.resolve(), 
    // update a record based on a patch
    update:     (resource, params) => Promise.resolve(), 
    // update a list of records based on an array of ids and a common patch
    updateMany: (resource, params) => Promise.resolve(), 
    // delete a record by id
    delete:     (resource, params) => Promise.resolve(), 
    // delete a list of records based on an array of ids
    deleteMany: (resource, params) => Promise.resolve(), 
}

export default dataProvider;