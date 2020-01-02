import * as React from 'react';

export class Frame extends React.Component {
	render() {
		return (
			<div className="frame">
				<div className="header">
					<h1>Battle of the Fandoms</h1>
				</div>
				<div className="content">{this.props.children}</div>
			</div>
		);
	}
}
