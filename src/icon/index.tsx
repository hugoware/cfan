import * as React from 'react';

import svgSearch from './search.html';

type IconType = 'search';

const SVGS: { [key: string]: string } = {
	search: svgSearch
};

interface Props {
	icon: IconType;
}

export class Icon extends React.Component<Props, {}> {
	render() {
		const svg = SVGS[this.props.icon];
		return <div dangerouslySetInnerHTML={{ __html: svg }} />;
	}
}
