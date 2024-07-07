import { useState } from 'react';

import './App.css';
import Api from './Api';
import Timeline from './components/Timeline';
import Duplicate from './components/Duplicate';
import Backup from './components/Backup';

const App = () => {

  const [userName, setUserName] = useState('');
  const [validUser, setValidUser] = useState(false);
  const api = new Api();

  const handleUsernameChange = (event: any) => {
    setUserName(event.target.value);
  };

  const handleUsernameSubmit = async (event: any) => {

    event.preventDefault();

    const response = await api.userGet(userName);

    if (response.status === 200 || response.status === 409) {
      setValidUser(true);
    } else {

      alert(JSON.stringify(response.data));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='title'>
          <h1>Spotify</h1>
          <h2>POWER TOOLS</h2>
        </div>
        <div className="user">
          <p>Enter your spotify username:</p>
          <form className="centered-form" onSubmit={handleUsernameSubmit}>
            <input type="text" value={userName} onChange={handleUsernameChange} placeholder="obamna" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base'/>
            <input type="submit" value="Submit" className="centered-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-base" />
          </form>
        </div>
        {
          validUser && (
            <div className="features">
              <Duplicate api={api} userName={userName} />
              <Backup api={api} userName={userName} />
              <Timeline api={api} userName={userName} />
            </div>
          )
        }
      </header>
    </div>
  );
};

export default App;