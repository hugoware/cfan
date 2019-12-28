import * as React from 'react';
import api from './api';

import { render } from 'react-dom';
import { CreateFandom } from './views/create-fandom';
import { Search } from './components/search';
import { Login } from './components/login';

import './styles/index.scss';

interface State {
	loading?: boolean;
}

class App extends React.Component<{}, State> {
	state: State = {
		loading: true
	};

	async componentDidMount() {
		await api.init();
	}

	onSearch = async () => {
		await api.search('exo');
	};

	onTryLogin = () => {
		console.log('try login');
		api.logInUsingGoogle();
	};

	render() {
		const { loading } = this.state;

		return (
			<div className="App">
				{loading && <div>Loading</div>}

				<Login />

				<CreateFandom />
			</div>
		);
	}
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);

//<LoginView />
//import { LoginView } from "./views/login";
