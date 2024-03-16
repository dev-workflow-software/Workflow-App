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
        </Container>     
    </div>);
};