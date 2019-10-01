import {createSelector, createStructuredSelector} from 'reselect';

// this.state = {
//     total: this.props.shipmentCardData.total_shipments,
//     in_transit: this.props.shipmentCardData.total_shipments_in_transit,
//     approved: this.props.shipmentCardData.total_shipments_shipped,
//     rejected: this.props.shipmentCardData.total_shipments_rejected,
//
//     data: [
//         {x: ' ', y: this.props.shipmentCardData.total_shipments_in_transit},
//         {x: ' ', y: this.props.shipmentCardData.total_shipments_shipped},
//         {x: ' ', y: this.props.shipmentCardData.total_shipments_rejected},
//     ],
// };

const totalSelector = state => state.total;
const in_transitSelector = state => state.in_transit;
const approvedSelector = state => state.shipped;
const rejectedSelector = state => state.rejected;

const dataSelector = createSelector(
  [in_transitSelector, approvedSelector, rejectedSelector],
  (in_transit, approved, rejected) => [
    {x: ' ', y: in_transit},
    {x: ' ', y: approved},
    {x: ' ', y: rejected},
  ],
);

export const shipmentCardSelector = createStructuredSelector({
  total: totalSelector,
  in_transit: in_transitSelector,
  approved: approvedSelector,
  rejected: rejectedSelector,
  data: dataSelector,
});
