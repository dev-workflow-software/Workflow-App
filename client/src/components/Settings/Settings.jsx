import { Title } from "react-admin"
import Container from '@mui/material/Container';
import { Outlet, useNavigate } from "react-router-dom";
import {Box,Tabs,Tab} from '@mui/material';
import { useState } from "react";


export const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    let routes = ["workflow","stockControl",'dsafsd'];
    if( ! routes[newValue]){
      console.error(`Tab Error: Invalid route index [${newValue}]`);
      return;
    }
    setActiveTab(newValue);
    navigate(`/settings/${routes[newValue]}`);
  };
    return <>
        <Title title="Settings" />
        <Container sx={{flex: "1 1 auto"}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="workflow" value={0}/>
              <Tab label="Item Two" value={1} />
              <Tab label="Item Three" value={2}  />
            </Tabs>
          </Box>
          <Outlet />
        </Container>
    </>
}