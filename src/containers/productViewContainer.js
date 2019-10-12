import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ProductView} from '../views';
import {fetchProducts} from '../actions';

const mapStateToProps = state => ({
  isLoading: state.products.isLoading,
  isUpdating: state.products.isUpdating,
  length: state.products.length,
  limit: state.products.limit,
  offset: state.products.offset,
  isRefreshing: state.products.isRefreshing,
  data: state.products.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetch: fetchProducts,
    },
    dispatch,
  );

export const ConnectedProductView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductView);
