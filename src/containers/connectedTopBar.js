import {connect} from 'react-redux';
import {TopBar} from '../components';
import {fetch_dashboard} from '../actions/dashboardActions';

const mapStateToProps = state => ({
  filter: state.dashboard.filter,
});

const mapDispatchToProps = dispatch => {
  return {
    onFiltering: filter => dispatch(fetch_dashboard(filter)),
  };
};

export const ConnectedTopBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
