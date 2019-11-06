import React from 'react';
import PropTypes from 'prop-types';
import {VictoryPie} from 'victory-native';

export const Chart = props => {
	const {data, width, height} = props;

	return (
		<VictoryPie
			data={data}
			width={width}
			height={height}
			padding={0}
			startAngle={90}
			endAngle={-90}
			// radius={({datum}) => datum.w}
			style={{
				data: {
					fill: ({datum}) => datum.fill,
					fillOpacity: 0.7,
				},
			}}
		/>
	);
};

Chart.defaultProps = {
	width: 200,
	height: 200,
};

Chart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};
