import React from "react";
import { Button, Space, Input } from "antd";
export const ChatFooter = ({ socket, roomName, setMessage, message }) => {
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        roomName: roomName,
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    roomName && (
      <Space.Compact style={{ width: "100%" }}>
        <Input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyUp={(e) => {
            e.key === "Enter" && handleSendMessage(e);
          }}
        />
        <Button
          size="large"
          style={{ height: "47px", width: "100px" }}
          icon={"送出"}
          onClick={(e) => {
            handleSendMessage(e);
          }}
        ></Button>
      </Space.Compact>
    )
  );
};
