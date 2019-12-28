import * as _ from 'lodash';
import * as React from 'react';
import api from '../../api';

interface Props {}

interface State {
	email?: string;
	password?: string;
	error?: 'missing_email' | 'missing_password' | 'login_failed';
	busy?: boolean;
}

export class Login extends React.Component<Props, State> {
	state: State = {};

	// called each time the email field changes
	onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const email = event.target.value;
		this.setState({ email });
	};

	// called each time the password field changes
	onChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const password = event.target.value;
		this.setState({ password });
	};

	// attemps to log into the app
	onLogin = async () => {
		const email = _.trim(this.state.email);
		const password = _.trim(this.state.password);

		// no email provided
		if (!email) {
			return this.setState({ error: 'missing_email' });
		}

		// no password provided
		if (!password) {
			return this.setState({ error: 'missing_password' });
		}

		// attempt the login
		this.setState({ busy: true });

		// attempt the login
		try {
			const result = await api.logInUsingEmail(email, password);
			console.log(result);
		} catch (ex) {
			this.setState({ error: 'login_failed' });
		} finally {
			// always clear the busy
			this.setState({ busy: false });
		}
	};

	renderError() {
		const { error } = this.state;

		return error === 'login_failed' ? (
			<div>Login failed</div>
		) : error === 'missing_email' ? (
			<div>Email required</div>
		) : error === 'missing_password' ? (
			<div>Missing password</div>
		) : null;
	}

	render() {
		return (
			<div className="login">
				{this.renderError()}
				<label>
					<span>email</span>
					<input type="text" onChange={this.onChangeEmail} />
				</label>

				<label>
					<span>password</span>
					<input type="password" onChange={this.onChangePassword} />
				</label>

				<button onClick={this.onLogin}>Login</button>
			</div>
		);
	}
}
