import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { RegisterClient } from './components/RegisterClient';
import './style.css'
import axios from 'axios';

function App() {
  const [clientKey, setClientKey] = useState(localStorage.getItem('clientKey'));
  const [clientKeyValid, setClientKeyValid] = useState(false);
  const [output, setOutput] = useState(<Loader/>);

  const validateKey = async () => {
    try{
      await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/validateClient`,{clientKey});
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
      setOutput(<RegisterClient setClientKey={setClientKey}/>);
      return;
    }
    setOutput(
      <div> Welcome to workflow</div>
    );

  },[clientKeyValid]);

  return output;
}

export default App;
 