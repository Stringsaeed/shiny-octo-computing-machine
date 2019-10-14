import {createSelector, createStructuredSelector} from 'reselect';

import {generator} from '../utils';

const colors = generator(5);

const totalSelector = state => state.total;
const in_transitSelector = state => state.in_transit;
const approvedSelector = state => state.shipped;
const rejectedSelector = state => state.rejected;

const receivedSelector = state => state.received;
const availableSelector = state => state.available;
const soldSelector = state => state.sold;
const scrapSelector = state => state.scrap;

const shipmentsSelector = state => state.shipments;
const paymentsSelector = state => state.payments;
const receivedAccountsSelector = state => state.received;
const remainingSelector = state => state.remaining;
const scrapPriceSelector = state => state.scrap;

const shipmentDataSelector = createSelector(
  [in_transitSelector, approvedSelector, rejectedSelector],
  (in_transit, approved, rejected) => [
    {x: ' ', y: in_transit, fill: colors[0]},
    {x: ' ', y: approved, fill: colors[1]},
    {x: ' ', y: rejected, fill: colors[2]},
  ],
);

const productsDataSelector = createSelector(
  [availableSelector, receivedSelector, scrapSelector],
  (available, received, scrap) => [
    {x: ' ', y: available, fill: colors[0]},
    {x: ' ', y: received, fill: colors[1]},
    {x: ' ', y: scrap, fill: colors[2]},
  ],
);

const accountsDataSelector = createSelector(
  [
    paymentsSelector,
    receivedAccountsSelector,
    remainingSelector,
    scrapPriceSelector,
  ],
  (payments, received, remaining, scrap) => [
    {x: ' ', y: payments, fill: colors[0]},
    {x: ' ', y: received, fill: colors[1]},
    {x: ' ', y: remaining, fill: colors[2]},
    {x: ' ', y: scrap, fill: colors[3]},
  ],
);

export const shipmentCardSelector = createStructuredSelector({
  total: totalSelector,
  in_transit: in_transitSelector,
  approved: approvedSelector,
  rejected: rejectedSelector,
  data: shipmentDataSelector,
});

export const productsCardSelector = createStructuredSelector({
  sold: soldSelector,
  received: receivedSelector,
  available: availableSelector,
  scrap: scrapSelector,
  data: productsDataSelector,
});

export const accountsCardSelector = createStructuredSelector({
  shipments: shipmentsSelector,
  payments: paymentsSelector,
  received: receivedAccountsSelector,
  remaining: remainingSelector,
  scrap: scrapPriceSelector,
  data: accountsDataSelector,
});
