import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import { Frame } from './components/frame';
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
		(api.isUserLoggedIn() ? nav.goToHome : nav.goToLogin)();
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
				<Frame>
					<Router>
						<Navigation>
							<Route path="/fandom/show/:id" component={ShowFandomView} />
							<Route path="/fandom/create" component={CreateFandomView} />
							<Route path="/home" component={HomeView} />
							<Route path="/login" component={LoginView} />
							<Route exact path="/" component={InitializeView} />
						</Navigation>
					</Router>
				</Frame>
			</div>
		);
	}
}

const Navigation = withRouter((props: any, state: any) => {
	initNav(props.history);
	return props.children;
});

const rootElement = document.getElementById('root');
render(<App />, rootElement);
