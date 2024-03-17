import axios from 'axios';
import { useState } from 'react';
import {FormControl, InputLabel, Input, Alert, Button, Container} from '@mui/material';

export const RegisterClient = ({setClientKey}) => {
    const [alert, setAlert] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/registerClient`,{registrationKey:data.get('registrationKey')});
            if(!response || !response.data || !response.data.key || !response.data.key.key){
                setAlert(<Alert severity="error">The server returned an unexpected response</Alert>);
                return;
            }
            localStorage.setItem('clientKey',response.data.key.key);
            setClientKey(response.data.key.key)

        } catch(error){
            if (error.response.status === 404){
                setAlert(<Alert severity="warning">Registration key invalid</Alert>);
            }
            else {
                setAlert(<Alert severity="error">The server returned an unexpected response: {error.response.status} ({error.response.data})</Alert>);
            }
        }
    }

    return (<div>
        <Container component="main" maxWidth="xs">
            <h1>Welcome to Workflow!</h1>
            <p>To use workflow on this device, please enter your registration key</p>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth >
                    <InputLabel htmlFor="registrationKey">Registration Key:</InputLabel>
                    <Input  id="registrationKey" type="text" name="registrationKey"/><br/>
                    {alert}
                    <Button variant="contained" type="submit">Register</Button>
                </FormControl>
            </form>
            <h2>How do I get a registration key?</h2>
            <p>
                Ask the person who referred you to this website, They will be able to generate a registration key for you. If you weren't referred by a human, click <a href={`mailto:workflowsoftwaredev@gmail.com?subject=${encodeURIComponent('I would like to register to use Workflow')}&body=${encodeURIComponent('Hi there!\r\n\r\nMy name is ______ and I would like to use Workflow\r\n\r\nKind Regards')}`} target="_blank">here</a> to email a workflow employee. They will reply with a long-life registration key, for you to use when next convenient.
            </p>
            <h2>Why do I need a registration key?</h2>
            <p>
                Workflow requires that devices can only connect to their API's if the device has been approved by a known user on a previously registered device. After sending your registration key, we will store it in your browser so you can continue to access our services
            </p>
        </Container>     
    </div>);
};