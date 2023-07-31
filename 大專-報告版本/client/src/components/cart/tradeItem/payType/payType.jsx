import React, { Component } from "react";
import paymentMethod from "../../../../data/paymentMethod.json";
import CreditCardsInput from "./creditCardsInput/creditCardsInput";
import { Select, Space } from "antd";
class PayType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosePayType: "",
    };
  }
  render() {
    return (
      <React.Fragment>
        <Space size={10} align="start" className="ps-3 mb-5 d-flex">
          <Select
            showArrow={0}
            style={{ width: 250, fontStyle: "900" }}
            defaultValue={"請選擇付款方式"}
            fieldNames={{ label: "paymentMethod", value: "payTypeEngName" }}
            options={paymentMethod}
            onChange={(e) => {
              this.changePayType(e);
              this.props.data.payMethod(e, this.props.productAccount);
            }}
          />
          {this.state.choosePayType === "Visa卡" && (
            <CreditCardsInput
              data={this.props.data}
              productAccount={this.props.productAccount}
            />
          )}
        </Space>
      </React.Fragment>
    );
  }

  //改變付款方式
  changePayType = (e) => {
    let newstate = { ...this.state };
    newstate.choosePayType = e;
    this.setState(newstate);
  };
}

export default PayType;
