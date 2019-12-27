import * as React from "react";
import { render } from "react-dom";
import { CreateFandom } from "./views/create-fandom";
import api from './api';
import { GetSummaryResult } from './api/get-summary';

import "./styles/index.scss";

interface State {
  loading?: boolean;
  result?: GetSummaryResult;
}

class App extends React.Component<{ }, State> {

  state: State = {
    loading: true,
  }

  async componentDidMount() {
    await api.init();

    const result = await api.getSummary();
    this.setState({ result });
    
    console.log(result);
  }

  onSearch = async () => {
    await api.search('exo');
  }

  render() {
    const { loading, result } = this.state;

    return (
      <div className="App">
        { loading && <div>Loading</div> }

        { result && <div>
          { result.top.map(item => <div>
            {item.name}
          </div> )}
        </div> }

        <button onClick={this.onSearch} >Search test</button>

        <CreateFandom />
      </div>
    );
  }

}


const rootElement = document.getElementById("root");
render(<App />, rootElement);


//<LoginView />
//import { LoginView } from "./views/login";