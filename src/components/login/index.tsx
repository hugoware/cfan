import * as React from 'react';
import api from '../../api';

interface Props {
	onLogin: () => void;
}

export class Login extends React.Component<Props> {
	state = {
		email: '',
		password: '',
		error: ''
	};

	onEmailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			email: event.target.value
		});
	};

	onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			password: event.target.value
		});
	};

	onLoginClicked = async () => {
		const email = this.state.email;
		const password = this.state.password;
		const result = await api.logInUsingEmail(email, password);

		if (result.success) {
			this.props.onLogin();
		} else {
			this.setState({ error: 'Your password failed' });
		}
	};

	onGoogleLoginClicked = async () => {
		const result = await api.logInUsingGoogle();
		console.log(result);
	};

	render() {
		return (
			<div className="login">
				<div>
					{this.state.error && <div>{this.state.error} </div>}
					<div className="container">
						<span>Email: </span>
						<input type="text" onChange={this.onEmailChanged} />
					</div>
					<div className="container">
						<span>Password: </span>
						<input type="password" onChange={this.onPasswordChanged} />
					</div>
					<div className="container">
						<input type="submit" value="login" onClick={this.onLoginClicked} />
					</div>

					<div className="container">
						<button onClick={this.onGoogleLoginClicked}>
							Log in with Google
						</button>
					</div>
				</div>
			</div>
		);
	}
}
