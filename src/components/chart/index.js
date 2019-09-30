import React from 'react';
import PropTypes from 'prop-types';
import {VictoryPie} from 'victory-native';

export const Chart = props => {
  const {data, colors, width, height} = props;
  return (
    <VictoryPie
      colorScale={colors}
      data={data}
      width={100}
      height={100}
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
