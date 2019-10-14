import Odoo from 'react-native-odoo-client';
import {parameters} from '../utils';
import {Filters} from '../utils';

export const odooAPI = settings => {
  const odoo = new Odoo(settings);
  return {
    auth: async () => {
      return await odoo.authenticate();
    },
    getDashboard: async filter => {
      const inParams = parameters(filter);
      return await odoo.search_read('seller.home.app', inParams, {});
    },
    getShipmentsLen: async filter => {
      const inParams = new Filters(filter).getInParam();
      return await odoo.search_count('portal.shipments', inParams);
    },
    getShipments: async (filter, offset, limit) => {
      const inParams = new Filters(filter).getInParam();
      inParams.push([
        'product_id',
        'picking_id',
        'quantity',
        'standard_price',
        'create_date',
        'state',
        'barcode',
      ]);
      return await odoo.search_read('portal.shipments', inParams, {
        offset: offset,
        limit: limit,
      });
    },
    getProductsLen: async () => {
      const inParams = new Filters('ALL').getInParam();
      return await odoo.search_count('product.template', inParams);
    },
    getProducts: async (offset, limit) => {
      const inParams = new Filters('ALL').getInParam();
      inParams.push([
        'name',
        'standard_price',
        'categ_id',
        'removal_time',
        'portal_state',
        'barcode',
        'responsible_id',
      ]);
      return await odoo.search_read('product.template', inParams, {
        offset: offset,
        limit: limit,
      });
    },
    createShipment: async (productId, quantity, userId) => {
      await odoo.create('portal.shipments', {
        product_id: productId,
        quantity: quantity,
        user_id: userId,
      });
    },
    getGroups: async () => {
      const inParams = [];
      inParams.push([['name', '=', 'Seller Manager']]);
      inParams.push(['id']);
      return await odoo.search_read('res.groups', inParams, {});
    },
    getUser: async userId => {
      const inParams = [];
      inParams.push([['id', '=', userId]]);
      inParams.push([
        'display_name',
        'email',
        'phone',
        'groups_id',
        'company_id',
        'id',
      ]);
      return await odoo.search_read('res.users', inParams, {});
    },
    getUsers: async (offset, limit) => {
      const inParams = [];
      inParams.push([]);
      inParams.push(['name', 'id']);
      return await odoo.search_read('res.users', inParams, {
        offset: offset,
        limit: limit,
      });
    },
    search: async (term, fields, modelName) => {
      const inParams = [];
      inParams.push([['name', 'like', term]]);
      inParams.push(fields);
      return await odoo.search_read(modelName, inParams, {});
    },
  };
};
