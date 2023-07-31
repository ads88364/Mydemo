import React, { Component } from "react";
import { Button } from "antd";
class PromptBox extends Component {
  state = {};
  render() {
    let displayType = "";
    let promptContent = "";
    displayType = this.changeDisplayType();
    promptContent=this.changePromptContent();
    return (
      <React.Fragment>
        <div
          style={{
            display: displayType,
            top: "0px",
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "fixed",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.209)",
            zIndex: "1",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "50%",
              left: "50%",
              width: "400px",
              height: "400px",
              border: "1px solid black",
              backgroundColor: "white",
              borderRadius: "20px",
            }}
          >
            <div className="col-12 d-flex flex-wrap">
              <div className="col-12 d-flex justify-content-center mb-5">
                {promptContent}
              </div>
              <div className="col-12 d-flex justify-content-center ">
                <Button
                  className="m-5"
                  onClick={() => {
                    this.props.data.closeAddress();
                  }}
                  type="primary"
                  style={{
                    fontSize: "2rem",
                    width: "auto",
                    height: "auto",
                  }}
                >
                  確認
                </Button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  changeDisplayType = () => {
    let displayType = "";
    if (
      this.props.data.state.err.address ||
      this.props.data.state.err.payMethod||
      this.props.data.state.err.cartInfo
    ) {
      displayType = "flex";
    } else {
      displayType = "none";
    }
    return displayType;
  };
  changePromptContent = () => {
    let promptContent = ""
    if(this.props.data.state.err.address){
      promptContent = "請確認地址資料是否已填寫!!"
    }else if(this.props.data.state.err.payMethod){
      promptContent="請確認付款方式是否已選擇!!"
    }
    else if(this.props.data.state.err.cartInfo){
      promptContent="請確認Visa卡資料是否填寫正確!!"
    }
    return promptContent
  }
}

export default PromptBox;
