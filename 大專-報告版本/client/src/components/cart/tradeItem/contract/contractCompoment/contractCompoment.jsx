import React, { Component } from "react";
import { ConfigProvider, Row, Col, Input } from "antd";
class ContractCompoment extends Component {
  state = {};
  render() {
    return (
      <ConfigProvider
        theme={{
          token: {
            fontSizeHeading1: "3rem",
            fontSizeHeading2: "2.5rem",
          },
        }}
      >
        <Col span={24}>
          <h1>海爾出租 租賃契約</h1>
        </Col>
        <Row>
          <Col span={24} style={{ display: "flex", textAlign: "start" }}>
            <h2>立契約書人：</h2>
          </Col>
          <ul>
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li>
                承租人：
                <span className="text-danger">
                  {this.props.data.state.accountInfo.name}
                </span>
                <span className="text-dark">(以下簡稱甲方)</span>
              </li>
            </Col>
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li>
                出租人：
                <span className="text-danger">{this.props.item.name}</span>
                <span className="text-dark">(以下簡稱乙方)</span>
              </li>
            </Col>
          </ul>
        </Row>
        <Row>
          <Col span={24} style={{ display: "flex", textAlign: "start" }}>
            <h2>承租品明細：</h2>
          </Col>
          <ul>
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li>
                出租品項：
                <span className="text-danger">
                  {this.props.item.productName}
                </span>
              </li>
            </Col>
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li>
                承租起迄日：
                <span className="text-dark">自</span>
                <span className="text-danger">
                  民國
                  <span className="rentStart">
                    {new Date(this.props.item.rentStart).getFullYear() - 1911}年
                    {new Date(this.props.item.rentStart).getMonth() + 1}月
                    {new Date(this.props.item.rentStart).getDate()}日
                  </span>
                </span>
                <span className="text-dark">至</span>
                <span className="text-danger">
                  民國
                  <span className="rentEnd">
                    {new Date(this.props.item.rentEnd).getFullYear() - 1911}年
                    {new Date(this.props.item.rentEnd).getMonth() + 1}月
                    {new Date(this.props.item.rentEnd).getDate()}日
                  </span>
                </span>
                <span className="text-dark">， 共</span>
                <span className="text-danger countDate">
                  {this.props.item.day}
                </span>
                <span className="text-dark">天</span>
              </li>
            </Col>
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li>
                租金：
                <span className="text-danger">
                  新臺幣
                  <span id="renterPrice2">{this.props.item.rent}</span>
                </span>
                <span className="text-dark">元</span>
              </li>
            </Col>
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li>
                押金：
                <span className="text-danger">
                  新臺幣
                  <span>{this.props.item.deposit}</span>
                </span>
                <span className="text-dark">元</span>
              </li>
            </Col>
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li>
                租公收取租金+押金， 共
                <span className="text-danger">
                  新臺幣
                  <span id="totalPrice">{this.props.item.total}</span>
                </span>
                <span className="text-dark">元</span>
              </li>
            </Col>
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li>歸還時確認無誤後，退還押金</li>
            </Col>
          </ul>
        </Row>
        <Row>
          <Col span={24} style={{ display: "flex", textAlign: "start" }}>
            <h2>
              茲因甲乙雙方進行家電租賃乙事，雙方特立本契約書，其協議範圍為本契約書指定品項之承租事宜，雙方同意按下列之約定進行各項事宜：
            </h2>
          </Col>
          <Col span={24} style={{ display: "flex", textAlign: "start" }}>
            <h2>第一條 租賃協議：</h2>
          </Col>
          <ul>
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              一、產品租金
            </Col>
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li>新臺幣{this.props.item.rent}元</li>
            </Col>
          </ul>
          <ul className="">
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              二、甲方如需延長承租時間，應提前確認產品後續無人承租，方可續租，並需提前於歸還日前12小時提出延長承租之要求，至多以延長兩次為限。(若有不可抗力之因素致無法如期歸還者除外)
            </Col>
          </ul>
          <ul className="">
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              三、本協議書乙式貳份，甲乙雙方各執正本乙份。
            </Col>
          </ul>
          <ul className="">
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              四、甲方於租賃前,應主動告知乙方所清潔區域是否有人感染法定傳染病,以便乙方後續清潔事宜。
            </Col>
          </ul>
          <ul className="">
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              五、如有本協議未盡之事宜，得經由雙方共同合議解決。
            </Col>
          </ul>
        </Row>
        <Row>
          <Col span={24} style={{ display: "flex", textAlign: "start" }}>
            <h2>第二條 損壞賠償：</h2>
          </Col>
          <ul className="">
            <Col
              span={24}
              style={{
                display: "flex",
                textAlign: "start",
              }}
            >
              甲方承租前，需確實檢查品項功能正常，乙方亦須主動告知產品現狀，如非正常使用以致損壞，甲方需依實際維修費用照價賠償於乙方。
            </Col>
          </ul>
        </Row>
        <Row>
          <Col span={24} style={{ display: "flex", textAlign: "start" }}>
            <h2>第三條 產品點交表：(請務必確認產品功能正常)</h2>
          </Col>
          <ul>
            <li>
              <Col span={24} style={{ display: "flex", textAlign: "start", alignItems:"center"}}>
                <Input checked readOnly className="imgActive" type="checkbox" />
                <label htmlFor="current-available">
                  <span className="text-danger">
                    {this.props.item.productName}
                  </span>
                  <span className="text-dark">(本體+配件 共</span>
                  <span className="text-danger">1</span>
                  <span className="blaxck">項)</span>
                </label>
              </Col>
            </li>
            <li>※若產品含有電子晶片，切勿碰水，如造成損壞依賠償之規定進行。</li>
          </ul>
        </Row>
        <Row>
          <Col span={24} style={{ display: "flex", textAlign: "start" }}>
            <h2>第四條 違約處理：</h2>
          </Col>
          <ul className="">
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li>
                甲方租借如逾期，若未提前1日提出延長承租之要求，則需支付產品租金兩倍罰金於乙方。(若有不可抗力之因素致無法如期歸還者除外)
              </li>
            </Col>
          </ul>
        </Row>
        <Row>
          <Col span={24} style={{ display: "flex", textAlign: "start" }}>
            <h2>第五條 歸還流程:</h2>
          </Col>
          <ul className="">
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <span className="text-dark">甲方</span>
              <span className="text-danger">
                {this.props.data.state.accountInfo.name}
              </span>
              <span className="text-dark">於民國 </span>
              <span className="text-danger rentEnd">
                {new Date(this.props.item.rentEnd).getFullYear() - 1911}年
                {new Date(this.props.item.rentEnd).getMonth() + 1}月
                {new Date(this.props.item.rentEnd).getDate()}日
              </span>
              <span className="text-dark">
                歸還產品後，乙方確認無誤即完成歸還流程。
              </span>
            </Col>
          </ul>
        </Row>
        <Row>
          <Col span={24} style={{ display: "flex", textAlign: "start" }}>
            <h2>第六條</h2>
          </Col>
          <ul className="">
            <Col span={24} style={{ display: "flex", textAlign: "start" }}>
              <li className="text-dark">
                如因本契約所發生之一切爭議，如有訴訟之必要，雙方合議由臺灣臺北地方法院為第一審管轄法院。
              </li>
            </Col>
          </ul>
        </Row>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={24} style={{ display: "flex" }}>
                <h2>甲方</h2>
              </Col>
              <ul className="list">
                <Col span={24} style={{ display: "flex", textAlign: "start" }}>
                  <li>
                    姓名：
                    <span className="text-danger" id="name">
                      {this.props.data.state.accountInfo.name}
                    </span>
                  </li>
                </Col>
                <Col span={24} style={{ display: "flex", textAlign: "start" }}>
                  <li>
                    身份證字號：
                    <span className="text-danger" id="id_number">
                      {this.props.data.state.accountInfo.identityCard}
                    </span>
                  </li>
                </Col>
                <Col span={24} style={{ display: "flex", textAlign: "start" }}>
                  <li>
                    行動電話：
                    <span className="text-danger" id="phone_number">
                      {this.props.data.state.accountInfo.phoneNumber}
                    </span>
                  </li>
                </Col>
                <Col span={24} style={{ display: "flex", textAlign: "start" }}>
                  <li>
                    E-MAIL：
                    <span className="text-danger">
                      {this.props.data.state.accountInfo.email}
                    </span>
                  </li>
                </Col>
              </ul>
            </Row>
          </Col>
          <Col span={12} style={{ display: "flex", textAlign: "start" }}>
            <Row>
              <Col span={24} style={{ display: "flex", textAlign: "start" }}>
                <h2>{this.props.item.name}</h2>
              </Col>
              <ul className="list">
                <Col span={24} style={{ display: "flex", textAlign: "start" }}>
                  <li>
                    姓名：<span className="text-danger">{this.props.item.name}</span>
                  </li>
                </Col>
                <Col span={24} style={{ display: "flex", textAlign: "start" }}>
                  <li>
                    身份證字號：<span className="text-danger">{this.props.item.identityCard}</span>
                  </li>
                </Col>
                <Col span={24} style={{ display: "flex", textAlign: "start" }}>
                  <li>
                    行動電話：<span className="text-danger">{this.props.item.phoneNumber}</span>
                  </li>
                </Col>
                <Col span={24} style={{ display: "flex", textAlign: "start" }}>
                  <li>
                    E-MAIL：<span className="text-danger">{this.props.item.email}</span>
                  </li>
                </Col>
              </ul>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <span>中華民國</span>
            <span className="year">{new Date().getFullYear() - 1911} 年 </span>
            <span className="month">{new Date().getMonth() + 1} 月 </span>
            <span className="day">{new Date().getDate()} 日</span>
          </Col>
        </Row>
      </ConfigProvider>
    );
  }
}

export default ContractCompoment;
