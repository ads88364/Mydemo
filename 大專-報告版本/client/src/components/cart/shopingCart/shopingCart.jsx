import React, { Component } from "react";
import ProductInfo from "./productInfo/index";
import Listname from "../listname/listname";
import { Link } from "react-router-dom";
import { Button, Divider, ConfigProvider } from "antd";

class ShopingCart extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.data.state.cartMap.length !== 0 ? (
          this.props.data.state.cartMap.map((item, index) => {
            return (
              this.props.data.state.cartMap[index].product.length !== 0 && (
                <div key={item.productAccount}>
                  <div className="d-flex align-items-center">
                    <input
                      className="imgActive"
                      type="checkbox"
                      checked={item.iscomplete}
                      onChange={(e) => {
                        this.props.data.changePart(e, item.iscomplete, index);
                      }}
                    />
                    <Link
                      to={`http://localhost:3000/productSeller/${item.productAccount}`}
                    >
                      <img
                        className="imgActive"
                        src="/images/icon/user-interface 4.png"
                        alt="ops"
                      />
                    </Link>
                    <Link
                      to={`http://localhost:3000/productSeller/${item.productAccount}`}
                    >
                      <div className="">{item.productAccount}</div>
                    </Link>
                    <Button
                      style={{
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                      }}
                      size="large"
                      className="ms-3 btnColor cartFontSize"
                      onClick={()=>{
                        this.props.data.changeChatInfo(item.productAccount);
                      }}
                    >
                      聊聊<i className="ps-2 bi bi-messenger"></i>
                    </Button>
                  </div>
                  <ConfigProvider
                    theme={{ token: { lineWidth: 4, margin: 0 } }}
                  >
                    <Divider dashed />
                  </ConfigProvider>
                  <Listname type={0} />
                  <ProductInfo
                    data={item.product}
                    cartMapIndex={index}
                    changeOne={this.props.data.changeOne}
                    showDeleteWindow={this.props.data.showDeleteWindow}
                  />
                  <ConfigProvider
                    theme={{ token: { lineWidth: 3, margin: 0 } }}
                  >
                    <Divider />
                  </ConfigProvider>
                </div>
              )
            );
          })
        ) : (
          <div className="m-5">
            <Link to={`http://localhost:3000/product`}>
              還沒有商品在租物車，租東西吧!!
            </Link>
          </div>
        )}
        {this.props.data.state.cartMap.length !== 0 && (
          <div className="d-flex col-12 align-items-center">
            <input
              id="all"
              className="imgActive ps-4"
              type="checkbox"
              checked={
                this.props.data.state.iscomplete &&
                this.props.data.state.iscomplete
              }
              onChange={() => {
                this.props.data.changeAll(
                  this.props.data.state.iscomplete &&
                    this.props.data.state.iscomplete
                );
              }}
            />
            <label htmlFor="all" className="cursorPointer">
              <div>全選</div>
            </label>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ShopingCart;
