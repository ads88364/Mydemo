import React, { Component } from "react";
import ContractCompoment from "./contractCompoment/contractCompoment";
import { ConfigProvider, Collapse } from "antd";
class Contract extends Component {
  render() {
    const items = this.getContractCompoment();
    return (
      <ConfigProvider>
        <Collapse items={items} />
      </ConfigProvider>
    );
  }

  getContractCompoment = () => {
    const items = [];
    const children = [];
    this.props.item.map((item) => {
      return children.push({
        productName: item.productName,
        children: (
          <ContractCompoment
            data={this.props.data}
            item={item}
            productAccount={this.props.productAccount}
          />
        ),
      });
    });
    children.map((value, index) => {
      return items.push({
        key: index + 1,
        label: value.productName,
        children: value.children,
        showArrow: false,
      });
    });
    return items;
  };
}

export default Contract;
