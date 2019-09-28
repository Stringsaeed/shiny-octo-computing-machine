import React from 'react';
import PropTypes from 'prop-types';
import {VictoryPie} from 'victory-native';

const Chart = props => {
  const {data, colors, width, height} = props;
  return (
    <VictoryPie
      colorScale={colors}
      data={data}
      width={width || 100}
      height={height || 100}
      padding={0}
    />
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Chart;
