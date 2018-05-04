import * as React from 'react';
import './App.css';
import { IAppState } from './IAppState';
import { ClientServiceGitHub } from './service/ClientServiceGitHub';
import { IRouterProps } from './ui/IRouterProps';
import { Settings } from './ui/page/settings/Settings';
import { Router } from './ui/Router';


class App extends React.Component<{}, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      accessToken: ''
    };
  }

  public componentDidMount() {
    this.setState({
      accessToken: ''
    });
  }

  public render() {

    if (this.state.accessToken.length < 1) {
      return (<Settings />);
    } else {
      const routerProps: IRouterProps = { clientService: new ClientServiceGitHub(this.state.accessToken) };
      return (
        <div className="App">
          <Router {...routerProps} />
        </div>
      );
    }

  }
}

export default App;
