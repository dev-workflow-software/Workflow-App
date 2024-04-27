import React from 'react';
import {DatagridConfigurable, List, ReferenceField, } from 'react-admin';

export const DocumentList = () => {
    return (
        <List>
            <DatagridConfigurable rowClick="edit" >
                <ReferenceField source="stageId" reference="stages"/>
                <ReferenceField source="customerId" reference="customers"/>
                <ReferenceField source="createdById" reference="users"/>
                <ReferenceField source="assigneeId" reference="users"/>
            </DatagridConfigurable>
        </List>
    )
};