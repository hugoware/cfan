import * as React from 'react';
import nav from '../../navigation';
import { Login } from '../../components/login';

export class LoginView extends React.Component {
	onLogin = () => {
		console.log('go to home');
		nav.go('/home');
	};

	render() {
		return (
			<div>
				<h1>Login</h1>
				<p>Please log in</p>
				<Login onLogin={this.onLogin} />
			</div>
		);
	}
}
