import {Admin,AppBar,CustomRoutes,Layout,Menu,Resource, TitlePortal, } from 'react-admin';
import { Route, Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import { DocumentList } from './documents/List';
import { DocumentShow } from './documents/Show';
import { DocumentEdit } from './documents/Edit';
import { DocumentCreate } from './documents/Create';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { RegisterClient } from './components/RegisterClient';
import axios from 'axios';
import { IconButton, Button } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Settings } from './components/Settings/Settings';
import { useNavigate } from "react-router-dom";
import { WorkflowSettings } from './components/Settings/Workflow';
import { StockControlSettings } from './components/Settings/StockControl';
import './App.css';

const SettingsButton = () => {
  const navigate = useNavigate();
  const settingsClick = (e)=>{
    console.log(e);
    navigate("/settings")
  }


  return <IconButton color="inherit" onClick={settingsClick}>
        <SettingsIcon />
  </IconButton>
};

const MenuSection = ({index}) => {
  const [expanded,setExpanded] = useState(false);
  
  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  },[expanded]);
  return (
    <>
      <a onClick={handleExpandClick} className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root .CustomColapsibleMenu" tabIndex="0" role="menuitem">
        <div className="MuiListItemIcon-root RaMenuItemLink-icon">
          {expanded?<KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/>}
        </div>
        {index}
      </a>
      {expanded?<Menu.ResourceItem name="documents" />:null}
    </>
  )
}
  const MyMenu = () => {

  return <Menu>
      <Menu.DashboardItem />
      <MenuSection index="Documents" />
      {/* TODO : Iterate through user menuitems */}
      <Menu.Item to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />} />
  </Menu>
};
const MyAppBar = () => {
  return <AppBar>
    <TitlePortal />
    <SettingsButton />
  </AppBar>
};

const MyLayout = props => { 
  return <Layout {...props} appBar={MyAppBar} menu={MyMenu}>
    {/* TODO: Breadcrumbs */}
    {props.children}
  </Layout> 
}


function App() {
  const [clientKey, setClientKey] = useState(localStorage.getItem('clientKey'));
  const [clientKeyValid, setClientKeyValid] = useState(false);
  const [output, setOutput] = useState(<Loader/>);

  const validateKey = async () => {
    try{
      await axios.post(`${import.meta.env.VITE_PUBLIC_API_HOST}/validateClient`,{clientKey});
      setClientKeyValid(true);
    }
    catch{
      localStorage.removeItem('clientKey');
      setClientKey(null);
      setClientKeyValid(false);
    }
  };

  useEffect(()=>{
    if(!clientKey){
      setOutput(<RegisterClient setClientKey={setClientKey}/>);
      return;
    }
    validateKey();
  },[clientKey]);

  useEffect(()=>{
    if(!clientKeyValid) {
      return;
    }
    setOutput(
      
      <Admin 
        layout={MyLayout}
        authProvider={authProvider}
        dataProvider={dataProvider}
        darkTheme={{palette:{mode:'dark'}}}
      >
        <Resource 
          name="documents"
          list={DocumentList}
          show={DocumentShow}
          edit={DocumentEdit}
          create={DocumentCreate}
          // icon={DocumentIcon}
        />
        <Resource 
          name="customers" 
          recordRepresentation="name" />
        <Resource name="users" recordRepresentation={(record) => `${record.name} ${record.surname}` } />
        <Resource name="stages" recordRepresentation="name"/>
        <CustomRoutes>
            <Route path="/settings" element={<Settings />}>
              <Route index element={<WorkflowSettings />} />
              <Route path="workflow" element={<WorkflowSettings />} />
              <Route path="stockControl" element={<StockControlSettings />} />
            </Route>
        </CustomRoutes>
      </Admin>
    );

  },[clientKeyValid]);

  return output;
}

export default App;
 