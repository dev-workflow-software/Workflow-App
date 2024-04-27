import { Create, ReferenceInput, SimpleForm, } from 'react-admin';

export const DocumentCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="stageId" reference="stages"/>
            <ReferenceInput source="customerId" reference="customers"/>
            <ReferenceInput source="createdById" reference="users"/>
            <ReferenceInput source='assigneeId' reference='users'/>
        </SimpleForm>
    </Create>
);