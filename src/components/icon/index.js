import React from 'react';
import PropTypes from 'prop-types';

import Product from '../../assets/icons/box.svg';
import Seller from '../../assets/icons/seller.svg';
import Shipment from '../../assets/icons/credit-card.svg';
import Product_Outlined from '../../assets/icons/box_outlined.svg';
import Shipment_Outlined from '../../assets/icons/delivery-truck.svg';

export const Icon = props => {
  switch (props.name) {
    case 'shipment':
      if (props.outlined) {
        return <Shipment_Outlined width={props.width} height={props.height} />;
      }
      return <Shipment width={props.width} height={props.height} />;
    case 'product':
      if (props.outlined) {
        return <Product_Outlined width={props.width} height={props.height} />;
      }
      return <Product width={props.width} height={props.height} />;
    default:
      return <Seller width={props.width} height={props.height} />;
  }
};

Icon.defaultProps = {
  name: 'seller',
  outlined: false,
  width: 25,
  height: 25,
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  outlined: PropTypes.boolean,
  width: PropTypes.anyOf(PropTypes.string, PropTypes.numeric),
  height: PropTypes.anyOf(PropTypes.string, PropTypes.numeric),
};
