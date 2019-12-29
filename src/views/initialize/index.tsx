import nav from '../../navigation';
import * as React from 'react';

export class InitializeView extends React.Component {
	componentDidMount() {
		setTimeout(() => nav.go('/login'), 2000);
	}

	render() {
		return <div>Initialize</div>;
	}
}
