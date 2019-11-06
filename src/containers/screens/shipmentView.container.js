import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ShipmentView} from '../../views';
import {fetch_shipments} from '../../actions';

const mapStateToProps = state => ({
	isLoading: state.shipments.isLoading,
	filter: state.shipments.filter,
	isUpdating: state.shipments.isUpdating,
	length: state.shipments.length,
	limit: state.shipments.limit,
	offset: state.shipments.offset,
	isRefreshing: state.shipments.isRefreshing,
	data: state.shipments.data,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetch: fetch_shipments,
		},
		dispatch,
	);

export const ConnectedShipmentView = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ShipmentView);
