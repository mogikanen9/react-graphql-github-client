import * as React from 'react';
import './App.css';
import { IAppState } from './IAppState';
import { ClientServiceGitHub } from './service/ClientServiceGitHub';
import { IRouterProps } from './ui/IRouterProps';
import { ISettingsProps } from './ui/page/settings/ISettingsProps';
import { Settings } from './ui/page/settings/Settings';
import { Router } from './ui/Router';


class App extends React.Component<{}, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      accessToken: ''
    };
    this.updateToken = this.updateToken.bind(this);
  }

  public componentDidMount() {
    this.updateToken('');
  }

  public updateToken(newToken: string): void {
    this.setState({
      accessToken: newToken
    });
  }

  public render() {

    if (this.state.accessToken.length < 1) {
      const props: ISettingsProps = { onSubmit: this.updateToken };
      return (<Settings {...props} />);
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
