import React from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
const ChatNavBar = ({productAccount,setShow}) => {
  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "#0B7597",
          color:"white",
          borderRadius: "6px 6px 0px 0px",
          justifyContent: "space-between",
          display: "flex",
          padding:"0px 20px 0px 20px"
        }}
      >
        <div>聊聊</div>
        <div>{productAccount}</div>
        <Button onClick={()=>{
          setShow("");
        }} shape="circle" type="text" icon={<MessageOutlined style={{color:"white"}} />}></Button>
      </div>
    </React.Fragment>
  );
};
export default ChatNavBar;
