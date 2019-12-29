import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import { HomeView } from './views/home';
import { LoginView } from './views/login';
import { InitializeView } from './views/initialize';

import api from './api';
import { init as initNav } from './navigation';

import './styles/index.scss';

interface State {
	busy?: boolean;
}

class App extends React.Component<{}, State> {
	state: State = {
		busy: true
	};

	async componentDidMount() {
		await api.init();
	}

	render() {
		const { busy } = this.state;

		return (
			<div className="App">
				<Router>
					<Preload />

					<Route path="/home" component={HomeView} />
					<Route path="/login" component={LoginView} />
					<Route exact path="/" component={InitializeView} />
				</Router>
			</div>
		);
	}
}

const Preload = withRouter((props: any, state: any) => {
	initNav(props.history);
	return null;
});

const rootElement = document.getElementById('root');
render(<App />, rootElement);
