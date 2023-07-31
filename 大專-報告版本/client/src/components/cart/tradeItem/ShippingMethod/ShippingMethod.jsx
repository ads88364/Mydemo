import React, { Component } from "react";
//寄送方式資料表
import shippingMethod from "../../../../data/shippingMethod.json";
import {
  Select,
  Button,
  Space,
  Input,
  Cascader,
  Row,
  Col,
  ConfigProvider,
} from "antd";
import { handleGetStore } from "../test/test";
import cookie from "react-cookies";
import CityCountyData from "../../../../data/CityCountyDataAAA.json";
class ShippingMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //寄送選擇
      shippingMethod: shippingMethod,
      //預設寄送方式
      chooseShippingMethod: "",
      //存地址資料之後回傳主頁面
      address: "",
      //地址資料
      CityCountyData: "",
      tradeTypePriceId: "",
      err: 0,
    };
  }
  render() {
    let state = this.state;
    return (
      <ConfigProvider theme={{ token: { controlHeight: "50px" } }}>
        <Row align={"middle"}>
          <Col span={22}>
            <Space.Compact
              size="large"
              className="p-3 align-items-center d-flex "
            >
              <Select
                style={{ width: 250 }}
                showArrow={0}
                defaultValue={"請選擇寄送方式"}
                fieldNames={{ label: "method" }}
                options={this.state.shippingMethod}
                onChange={(e) => {
                  this.changeShippingMethod(e);
                }}
              />
              {state.chooseShippingMethod === "BlackCat" && (
                <Cascader
                  style={{ width: 250, fontStyle: "900" }}
                  showArrow={0}
                  allowClear={0}
                  defaultValue={"請選擇縣市"}
                  fieldNames={{
                    label: "Name",
                    value: "Name",
                    children: "AreaList",
                  }}
                  options={CityCountyData}
                  onChange={(e) => {
                    this.changeCityCounty(e);
                  }}
                />
              )}
              <Input
                className="cartFontSize"
                status={this.state.err && "error"}
                style={{ height: 50, width: "65%" }}
                placeholder={
                  this.state.chooseShippingMethod === "BlackCat"
                    ? this.state.CityCountyData
                      ? "地址欄位"
                      : "請先選擇縣市"
                    : "地址欄位"
                }
                readOnly={state.chooseShippingMethod !== "BlackCat"}
                disabled={
                  !this.state.CityCountyData &&
                  state.chooseShippingMethod === "BlackCat"
                }
                value={state.address}
                onChange={(e) => {
                  this.writeAddress(e);
                  this.props.data.addAddress(
                    this.state.chooseShippingMethod === "BlackCat"
                      ? e.target.value !== ""
                        ? this.state.CityCountyData + e.target.value
                        : ""
                      : e.target.value,
                    this.props.productAccount,
                    0,
                    this.state
                  );
                }}
              />
              {state.chooseShippingMethod &&
                state.chooseShippingMethod !== "BlackCat" && (
                  <Button
                    style={{ height: 50, lineHeight: 0 }}
                    size="large"
                    onClick={() => {
                      handleGetStore(this.state.chooseShippingMethod);
                      this.checkCookieChange();
                    }}
                  >
                    請選擇地址
                  </Button>
                )}
            </Space.Compact>
          </Col>
          <Col style={{ display: "flex" }} span={2}>
            {this.props.item.tradeTypePriceId && (
              <div>
                運費
                <span className="text-danger">
                  {this.props.item.tradeTypePriceId}
                </span>
              </div>
            )}
          </Col>
        </Row>
      </ConfigProvider>
    );
  }

  //沒招了，定時監聽cookie變化
  checkCookieChange = () => {
    //重製cookie確保沒有錯誤
    cookie.remove("address");
    //設置cookie第三參數表示給全頁面使用
    cookie.save("address", "", { path: "/" });
    //開始監聽
    this.keepListenMessage(1);
  };

  //監聽cookie功能
  keepListenMessage = (i) => {
    //監聽是否更新
    let address = cookie.load("address");
    //cookie有更新就更新資料
    if (address) {
      //不知道為甚麼得解兩次JSON
      let newstate = { ...this.state };
      address = JSON.parse(address);
      address = JSON.parse(address);
      //將資訊放上來
      newstate.address = address.CVSAddress + address.CVSStoreName;
      newstate.address ? (newstate.err = 0) : (newstate.err = 1);
      //移除cookie
      cookie.remove("address");
      //更新資料
      this.props.data.addAddress(
        newstate.address,
        this.props.productAccount,
        0,
        this.state
      );
      this.setState(newstate);
    } else {
      //持續監聽設十分鐘後取消監聽
      i++;
      i < 6000 &&
        setTimeout(() => {
          this.keepListenMessage(i);
        }, 100);
    }
  };

  //手動輸入地址要更新資訊+資訊欄為空值時增加err count
  writeAddress = (e) => {
    let newstate = { ...this.state };
    newstate.address = e.target.value;
    newstate.address ? (newstate.err = 0) : (newstate.err = 1);
    this.setState(newstate);
  };

  //選擇縣市地址
  changeCityCounty = (target) => {
    let newstate = { ...this.state };
    newstate.CityCountyData = "";
    target.map((value) => {
      return (newstate.CityCountyData += value);
    });
    this.setState(newstate);
  };

  //讓選擇新的運送方式時清空地址並禁止手動輸入
  changeShippingMethod = (target) => {
    let newstate = { ...this.state };

    newstate.tradeTypePriceId = shippingMethod.filter((item) => {
      return item.value === target;
    })[0].tradeTypePriceId;

    newstate.chooseShippingMethod = target;
    newstate.CityCountyData = "";
    newstate.address = "";
    newstate.err = 0;
    this.props.data.addAddress(
      newstate.address,
      this.props.productAccount,
      target,
      newstate
    );
    this.setState(newstate);
  };
}

export default ShippingMethod;
