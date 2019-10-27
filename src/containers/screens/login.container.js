import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {loginRequest} from '../../actions';
import {Login} from '~/views';

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  emailError: state.auth.emailError,
  passwordError: state.auth.passwordError,
  success: state.auth.success,
  settings: state.auth.settings,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginRequest,
    },
    dispatch,
  );

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
