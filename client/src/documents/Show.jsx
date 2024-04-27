import { ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const DocumentShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="stageId" reference="stages"/>
            <ReferenceField source="customerId" reference="customers"/>
            <ReferenceField source="createdById" reference="users"/>
            <ReferenceField source="assigneeId" reference="users"/>
        </SimpleShowLayout>
    </Show>
);