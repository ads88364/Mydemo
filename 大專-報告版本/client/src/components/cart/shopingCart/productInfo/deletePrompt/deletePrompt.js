//刪除購物車商品視窗
import React, { Component } from "react";
import { Button } from "antd";
class DeletedPrompt extends Component {
  render() {
    return (
      <div
        style={{
          display: `${this.props.show ? "flex" : "none"}`,
          top: "0px",
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
            display: `${this.props.show ? "flex" : "none"}`,
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
          {this.props.data.state.deletePromptType === 1 &&
            this.props.data.state.deletePrompt && (
              <React.Fragment>
                <div className="col-12 d-flex flex-wrap">
                  <div className="col-12" style={{boxSizing:"border-box",textAlign:"center"}}>確定刪除</div>
                  <div className="col-12 mb-5 ps-4 pe-4" style={{boxSizing:"border-box",textAlign:"center"}}>
                    <span style={{color:"red"}}>{this.props.data.state.deletePrompt.productName}</span>?
                  </div>
                  <div className="col-12 d-flex justify-content-center ">
                    <Button
                      className="m-5"
                      onClick={() => {
                        this.props.data.deleteItem(
                          this.props.data.state.deletePrompt &&
                            this.props.data.state.deletePrompt
                        );
                      }}
                      type="primary"
                      danger
                      style={{
                        fontSize: "2rem",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      是
                    </Button>
                    <Button
                      className="m-5"
                      onClick={() => {
                        this.props.data.cancel();
                      }}
                      type="primary"
                      style={{
                        fontSize: "2rem",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      否
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            )}
          {this.props.data.state.deletePromptType === 2 && (
            <React.Fragment>
              <div className="col-12 d-flex flex-wrap">
                <div className="col-12 d-flex justify-content-center mb-3">
                  未勾選商品!!!
                </div>
                <div className="col-12 d-flex justify-content-center ">
                  <Button
                    className="m-3"
                    onClick={() => {
                      this.props.data.cancel();
                    }}
                    type="primary"
                    style={{ fontSize: "2rem", width: "auto", height: "auto" }}
                  >
                    確定
                  </Button>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default DeletedPrompt;
