import React, { Component } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Col, Row, ConfigProvider } from "antd";

class ProductInfo extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.data.map((item, index) => {
          return (
            <React.Fragment key={item.cartMapId}>
              <Row gutter={[16, 16]} align={"middle"} className="cartFontSize">
                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                  <input
                    type="checkbox"
                    className="imgActive"
                    value={item.cartMapId}
                    disabled={(new Date(item.rentStart).getTime()-new Date().getTime()) <=(1000*60*60*24*4)}
                    checked={(new Date(item.rentStart).getTime() - new Date().getTime()) > (1000*60*60*24*4) && item.iscomplete && item.iscomplete}
                    onChange={(e) => {
                      this.props.changeOne(
                        e,
                        item.iscomplete ? item.iscomplete : 0,
                        index,
                        this.props.cartMapIndex
                      );
                    }}
                  />
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className="cartFontSize"
                >
                  <img
                    className="imgActive2"
                    src={"http://localhost:8000/img/" + item.imageSrc}
                    alt="errrr"
                  />
                </Col>
                <Col
                  xs={5}
                  sm={5}
                  md={5}
                  lg={5}
                  xl={5}
                  className="cartFontSize"
                >
                  {item.productName}
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  style={{wordBreak:"break-word"}}
                  className="dateFontSize"
                >
                  {item.rentStart}~{item.rentEnd}
                  <br/>
                  <span style={{color:"red",fontWeight:"900"}}>{(new Date(item.rentStart).getTime()-new Date().getTime())<=(1000*60*60*24*4)&&"商品租借起始日最少須在四天後"}</span>
                  
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  className="cartFontSize"
                >
                  {item.day}
                </Col>
                <Col
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                  style={{wordBreak:"break-word"}}
                  className="cartFontSize"
                >
                  {item.rent}
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  style={{wordBreak:"break-word"}}
                  className="cartFontSize"
                >
                  {item.deposit}
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  style={{wordBreak:"break-word"}}
                  className="cartFontSize"
                >
                  {item.total}
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                  <ConfigProvider theme={
                    {
                      token:{
                        borderRadius:50,
                        padding:0,
                        fontSize:12
                      }
                    }
                  }>
                    <Button
                      type="primary"
                      icon={<CloseOutlined />}
                      value={item.cartMapId}
                      danger={true}
                      style={{borderRadius:"50%",height:"30px",width:"30px"}}
                      onClick={() => {
                        this.props.showDeleteWindow(item, 1);
                      }}
                    ></Button>
                  </ConfigProvider>
                </Col>
              </Row>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}

export default ProductInfo;
