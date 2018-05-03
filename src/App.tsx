import * as React from 'react';
import './App.css';

import { ClientServiceGitHub } from './service/ClientServiceGitHub';
import { IRouterProps } from './ui/IRouterProps';
import { Router } from './ui/Router';

class App extends React.Component {
  public render() {

    const routerProps: IRouterProps = { clientService: new ClientServiceGitHub() };

    return (
      <div className="App">
        <Router {...routerProps} />
      </div>
    );
  }
}

export default App;
