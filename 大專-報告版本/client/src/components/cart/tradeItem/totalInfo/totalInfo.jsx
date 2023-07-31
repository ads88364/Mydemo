import React, { Component } from "react";
import {} from "antd";
class TotalInfo extends Component {
  state = {
    tradeItem: this.props.data.state.tradeItem,
  };
  render() {
    let totalTradeTypePriceId = 0;
    this.state.tradeItem.map((item) => {
      totalTradeTypePriceId += Number(item.tradeTypePriceId);
    });
    return (
      <React.Fragment>
        <div>
          共
          <span className="text-danger">
            {this.props.data.state.productLength}
          </span>
          商品，總金額:
          <span className="text-danger">
            {this.props.data.state.totalMoney +
              (totalTradeTypePriceId ? totalTradeTypePriceId : 0)}
          </span>
          元
        </div>
      </React.Fragment>
    );
  }
}

export default TotalInfo;
