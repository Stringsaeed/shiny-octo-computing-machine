import React, { Component } from "react";
import Odoo from "react-native-odoo-xmlrpc";
import { ArabicNumbers } from "react-native-arabic-numbers";
import { View, ActionSheet } from "native-base";
import { BallIndicator } from "react-native-indicators";
import { Actions } from "react-native-router-flux";

export default class Indicator extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount() {
    const odoo = new Odoo({
      url: "http://odoo11.crevisoft.com:8069",
      db: "portal",
      username: "info@crevisoft.com",
      password: "admin"
    });
    odoo
      .authenticate()
      .then(response => {
        var inParams = [];
        inParams.push([["filter_name", "=", "All"]]);
        odoo
          .search_read("seller.home.app", inParams, {})
          .then(value => {
            Actions.dashboard({
              total: ArabicNumbers(value[0].total_shipments),
              in_transit: ArabicNumbers(value[0].total_shipments_in_transit),
              approved: ArabicNumbers(value[0].total_shipments_approved),
              rejected: ArabicNumbers(value[0].total_shipments_rejected),
              data: [
                {
                  x: "في الطريق",
                  y: value[0].total_shipments_in_transit
                },
                {
                  x: "المستلمة",
                  y: value[0].total_shipments_approved,
                  legendFontSize: 15
                },
                {
                  x: "المرفوضة",
                  y: value[0].total_shipments_rejected
                }
              ],
              qty_rec: ArabicNumbers(value[0].quantity_products_received),
              qty_ava: ArabicNumbers(value[0].quantity_available_products),
              qty_act_sold: ArabicNumbers(value[0].quantity_actual_sold),
              qty_scrap: ArabicNumbers(value[0].quantity_scrap_products),
              qty_data: [
                { x: "المباعة", y: value[0].quantity_products_received },
                { x: "بالمحل", y: value[0].quantity_available_products },
                { x: "منتهية", y: value[0].quantity_actual_sold }
              ]
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <BallIndicator color="black" />
      </View>
    );
  }
}
