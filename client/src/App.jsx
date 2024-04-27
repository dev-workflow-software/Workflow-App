import {Admin,AppBar,CustomRoutes,Layout,Menu,Resource, TitlePortal, } from 'react-admin';
import { Route, Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import { DocumentList } from './documents/List';
import { DocumentShow } from './documents/Show';
import { DocumentEdit } from './documents/Edit';
import { DocumentCreate } from './documents/Create';
import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { RegisterClient } from './components/RegisterClient';
import axios from 'axios';
import { IconButton } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Config } from './components/Config';

const SettingsButton = () => {
  return <IconButton color="inherit">
        <SettingsIcon />
  </IconButton>
};

const MenuSection = ({index}) => {
  const [expanded,setExpanded] = useState(false);
  console.log('render');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }
  return (
    <>
      <a onClick={handleExpandClick} className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root" tabIndex="0" role="menuitem">
        <div className="MuiListItemIcon-root RaMenuItemLink-icon css-cveggr-MuiListItemIcon-root">
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
  const settingsClick = (e)=>{
    console.log(e);
  }

  return <AppBar>
    <TitlePortal />
    <Link component={RouterLink} to="/config">
        <SettingsButton />
    </Link>
  </AppBar>
};

const MyLayout = props => <Layout {...props} appBar={MyAppBar} menu={MyMenu}/>


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
            <Route path="/config" element={<Config />} />
        </CustomRoutes>
      </Admin>
    );

  },[clientKeyValid]);

  return output;
}

export default App;
 