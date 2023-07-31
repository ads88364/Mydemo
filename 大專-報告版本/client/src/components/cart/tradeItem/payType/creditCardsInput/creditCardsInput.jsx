import React, { Component } from "react";
import { Input, Form, Select, Space } from "antd";
import "./css.css";
import creadCartmonth from "../../../../../data/creadCartmonth.json";
import creditCardYear from "./countcreditCardYear";

class CreditCardsInput extends Component {
  state = {
    creditCardNumber: "",
    creadCartmonth: "",
    creditCardYear: "",
    cvc: "",
    creditCardYearList: creditCardYear,
    err: 0,
  };
  render() {
    return (
      <React.Fragment>
        <Form className="d-flex">
          <Space>
            <Form.Item
              name={"信用卡號"}
              rules={[
                { required: true, message: "請輸入信用卡號!" },
                {
                  type: "string",
                  min: 16,
                  pattern: "^[0-9]*$",
                  message: "請輸入正確卡號格式",
                },
              ]}
            >
              <Input
                style={{ width: 300, height: 50 }}
                placeholder={"請輸入信用卡號碼"}
                value={this.state.creditCardInfo}
                status={this.state.err ? "error" : ""}
                className="cartFontSize"
                maxLength={16}
                onChange={(e) => {
                  this.changeCreditCardNumber(
                    e.target.value,
                    "creditCardNumber"
                  );
                }}
              />
            </Form.Item>
            <Form.Item>
              <Select
                showArrow={0}
                style={{ width: 100, height: 50 }}
                options={creadCartmonth}
                defaultValue={"月份"}
                fieldNames={{ label: "month", value: "month" }}
                onChange={(e) => {
                  this.changeCreditCardNumber(e, "creadCartmonth");
                }}
              />
            </Form.Item>
            <Form.Item>
              <Select
                showArrow={0}
                style={{ width: 100, height: 50 }}
                options={this.state.creditCardYearList}
                defaultValue={"年份"}
                fieldNames={{ label: "year", value: "year" }}
                onChange={(e) => {
                  this.changeCreditCardNumber(e, "creditCardYear");
                }}
              />
            </Form.Item>
            <Form.Item
              name={"安全碼"}
              rules={[
                { required: true, message: "請輸入CVC!" },
                {
                  type: "string",
                  min: 3,
                  pattern: "^[0-9]*$",
                  message: "請輸入正確格式",
                },
              ]}
            >
              <Input
                style={{ width: 150, height: 50 }}
                placeholder={"CVC"}
                value={this.state.cvc}
                className="cartFontSize"
                maxLength={3}
                onChange={(e) => {
                  this.changeCreditCardNumber(e.target.value, "cvc");
                  console.log(e)
                }}
              />
            </Form.Item>
          </Space>
        </Form>
      </React.Fragment>
    );
  }

  //修改資料
  changeCreditCardNumber = (e, target) => {
    let newstate = { ...this.state };
    newstate[target] = e;
    newstate.creditCardNumber ? (newstate.err = 0) : (newstate.err = 1);
    this.setState(newstate);
    this.props.data.creditCardInfo(
      this.props.productAccount,
      newstate.creditCardNumber,
      newstate.creadCartmonth,
      newstate.creditCardYear,
      newstate.cvc
    );
  };
}

export default CreditCardsInput;
