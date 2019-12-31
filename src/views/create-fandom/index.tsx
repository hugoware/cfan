import _ from 'lodash';
import api from '../../api';
import nav from '../../navigation';
import * as React from 'react';

interface Props {}

interface State {
	name?: string;
	color?: string;
	profile?: Blob;
	hero?: Blob;

	error?:
		| 'name_required'
		| 'name_already_used'
		| 'name_too_short'
		| 'name_too_long'
		| 'name_invalid'
		| 'color_required'
		| 'color_invalid'
		| 'profile_image_invalid'
		| 'profile_image_required'
		| 'profile_image_too_large'
		| 'profile_image_too_small'
		| 'hero_image_invalid'
		| 'hero_image_too_large'
		| 'hero_image_too_small';
}

export class CreateFandomView extends React.Component<Props, State> {
	state: State = {};

	onNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			name: event.target.value
		});
	};

	onColorChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			color: event.target.value
		});
	};

	// keep track of the selected image
	onSelectProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const profile = _.first(event.target.files);
		this.setState({ profile });
	};

	// chooses a hero image
	onSelectHeroImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const hero = _.first(event.target.files);
		this.setState({ hero });
	};

	// requests a new fandom
	onCreateFandom = async () => {
		const { name, profile, hero, color } = this.state;
		try {
			const result = await api.createFandom(name, color, profile, hero);
			console.log(result);
		} catch (ex) {
			alert(`create fandom failed: ${ex.toString()}`);
		}
	};

	render() {
		return (
			<div>
				<div className="header">
					<h1>Header</h1>
					<p>The battle of the Fandoms</p>
				</div>
				<button onClick={() => nav.go('/home')}>Back</button>

				<div className="content">
					<div>
						<p>Name:</p>
						<input type="text" onChange={this.onNameChanged} />
					</div>

					<div>
						<p>Color:</p>
						<input type="text" onChange={this.onColorChanged} />
					</div>

					<div>
						<p>Profile Image:</p>
						<input
							type="file"
							accept="image/*"
							onChange={this.onSelectProfileImage}
						/>
					</div>

					<div>
						<p>Hero Image:</p>
						<input
							type="file"
							accept="image/*"
							onChange={this.onSelectHeroImage}
						/>
					</div>
					<div className="actions">
						<button onClick={this.onCreateFandom}>Create Fandom</button>
					</div>
				</div>
			</div>
		);
	}
}

//username avatar search menu pluss button
