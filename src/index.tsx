import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import { HomeView } from './views/home';
import { LoginView } from './views/login';
import { InitializeView } from './views/initialize';
import { CreateFandomView } from './views/create-fandom';
import { ShowFandomView } from './views/show-fandom';

import api from './api';
import nav, { init as initNav } from './navigation';

import './styles/index.scss';

interface State {
	busy?: boolean;
}

class App extends React.Component<{}, State> {
	state: State = {
		busy: true
	};

	// handle when a user disconnects
	onUserStateChange = () => {
		const target = api.isUserLoggedIn() ? 'home' : 'login';
		nav.go(`/${target}`);
	};

	// setup the view
	async componentDidMount() {
		api.addUserStateChangeListener(this.onUserStateChange);
		await api.init();
	}

	render() {
		const { busy } = this.state;

		return (
			<div className="App">
				<Router>
					<Preload />

					<Route path="/fandom/show/:key" component={ShowFandomView} />
					<Route path="/fandom/create" component={CreateFandomView} />
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
