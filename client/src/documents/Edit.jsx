import { 
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
} from 'react-admin';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

export const DocumentEdit = () => (
    <Edit>
        <SimpleForm>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <ReferenceInput source="stageId" reference="stages"><SelectInput fullWidth/></ReferenceInput>
                            <ReferenceInput source="customerId" reference="customers"><SelectInput fullWidth/></ReferenceInput>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <ReferenceInput source="createdById" reference="users"><SelectInput fullWidth/></ReferenceInput>
                            <ReferenceInput source='assigneeId' reference='users'><SelectInput fullWidth/></ReferenceInput>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </SimpleForm>
    </Edit>
);