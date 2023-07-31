import React, { Component } from "react";
import Listname from "../listname/listname";
import TradeItemInfo from "./tradeItemInfo/tradeItemInfo";
import ShippingMethod from "./ShippingMethod/ShippingMethod";
import Contract from "./contract/contract";
import PayType from "./payType/payType";
import PromptBox from "./promptBox/promptBox";
import TotalInfo from "./totalInfo/totalInfo";
import { Col, Row, Divider, ConfigProvider, Collapse } from "antd";

class TradeItem extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.data.state.tradeItem &&
          this.props.data.state.tradeItem.map((item, index) => {
            let items = [];
            items.push({
              key: index + 1,
              label: "契約書",
              children: (
                <Contract
                  productAccount={item.productAccount}
                  data={this.props.data}
                  item={item.product}
                />
              ),
              showArrow: false,
            });
            return (
              <React.Fragment key={item.productAccount}>
                <Row className={"d-flex fw-bolder"}>
                  <Col xs={24} className="cartFontSize mt-4">
                    {item.productAccount}的商品
                  </Col>
                  <Divider className="borderclass" />
                </Row>
                {this.props.data.state.tradeItem[index].product.length !==
                  0 && (
                  <React.Fragment key={item.productAccount}>
                    {/* 商品list說明 */}
                    <Listname type={1} />
                    {/* 列出訂單裡的商品 */}
                    {item.product.map((value) => {
                      return (
                        <TradeItemInfo item={value} key={value.cartMapId} />
                      );
                    })}
                    <Divider className="borderclass" />
                  </React.Fragment>
                )}
                <Row>
                  <Col xs={24} className="cartFontSize">
                    寄送資訊
                  </Col>
                </Row>
                {/* 寄送方式元件 */}
                <ConfigProvider theme={{ token: {} }}>
                  <ShippingMethod
                    data={this.props.data}
                    productAccount={item.productAccount}
                    item={item}
                  />
                  <PayType
                    data={this.props.data}
                    productAccount={item.productAccount}
                  />
                  <Collapse items={items} />
                </ConfigProvider>
              </React.Fragment>
            );
          })}
        <TotalInfo data={this.props.data}/>
        <PromptBox data={this.props.data}/>
      </React.Fragment>
    );
  }
}

export default TradeItem;
