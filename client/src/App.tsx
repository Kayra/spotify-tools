import React, { Component } from 'react';

import './App.css';
import Api from './Api';
import Timeline from './components/Timeline';
import Duplicate from './components/Duplicate';
import Backup from './components/Backup';


interface IProps {
}

interface IState {
  userName: string;
  validUser: boolean;
}

class App extends Component<IProps, IState> {

  api: Api;

  constructor(props: any) {

    super(props);

    this.api = new Api();
    this.state = {
      userName: '',
      validUser: false
    };
  
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);

  }

  handleUsernameChange(event: any): void {
    this.setState({userName: event.target.value});
  }

  async handleUsernameSubmit(event: any): Promise<void> {

    event.preventDefault();
    const response = await this.api.userCreate(this.state.userName);

    if (response.status === 200 || response.status === 409) {
      this.setState({validUser: true});
    } else {
      alert(response.data);
    }

  }

  render() {
    return (
    <div className="App">
      <header className="App-header">

        <div className='title'>
          <h1>Spotify</h1>
          <h2>POWER TOOLS</h2>
        </div>

        <div className="user">
          <h2>Enter your Spotify username to get started.</h2>
          <form className="centered-form" onSubmit={this.handleUsernameSubmit}>
            <input type="text" value={this.state.userName} onChange={this.handleUsernameChange} placeholder="obamna" />
            <input type="submit" value="Submit" className="centered-button" />
          </form>
        </div>

        {
          this.state.validUser ?
            <div className="features">

              <Duplicate api={this.api} userName={this.state.userName}/>
              <Backup api={this.api} userName={this.state.userName}/>
              <Timeline api={this.api} userName={this.state.userName}/>

            </div>
          : ""
        }

      </header>
    </div>
    )
  }
}

export default App;
