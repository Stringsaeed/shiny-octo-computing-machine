import {connect} from 'react-redux';
import {TopBar} from '../components';
import {fetch_dashboard} from '../actions/dashboardActions';

const mapDispatchToProps = dispatch => {
  return {
    onFiltering: filter => dispatch(fetch_dashboard(filter)),
  };
};

export const ConnectedTopBar = connect(
  {},
  mapDispatchToProps,
)(TopBar);
