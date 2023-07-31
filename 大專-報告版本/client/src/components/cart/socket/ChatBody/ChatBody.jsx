import axios from "axios";
import React, { useRef, useEffect } from "react";

export const ChatBody = ({
  roomName,
  socket,
  setRemoveRoom,
  setMessages,
  messages,
  productAccount,
}) => {
  socket.on(`${roomName}`, (data) => {
    setRemoveRoom(roomName);
    data.roomName === roomName && setMessages([...messages, data]);
  });

  useEffect(() => {
    messages.length !== 0 &&
      axios.put("http://localhost:8000/cart/upDateChatContain", {
        account: localStorage.getItem("userName"),
        productAccount: productAccount,
        contain: messages,
      });
  }, [messages]);

  const scrollContainerRef = useRef(null);

  // 滚动到底部
  const scrollToBottom = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <React.Fragment key={"0"}>
      <div
        ref={scrollContainerRef}
        id="scroll"
        className="scroll-container"
        style={{ height: "500px", overflow: "auto", backgroundColor: "white" }}
      >
        {messages.map((message, index) => {
          if (message.name === localStorage.getItem("userName")) {
            return (
              <React.Fragment key={index}>
                <div
                  style={{
                    textAlign: "end",
                    marginLeft: "auto",
                    paddingLeft: "10px",
                    marginRight: "10px",
                    marginTop: "10px",
                    fontSize: "1rem",
                  }}
                >
                  自己
                </div>
                <div
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    alignItems: "end",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      marginLeft: "auto",
                      textAlign: "end",
                      paddingRight: "10px",
                      fontSize: "1rem",
                    }}
                  >
                    {message.date}
                  </div>
                  <div
                    className=""
                    key={message.id}
                    style={{
                      maxWidth: "400px",
                      backgroundColor: "#FFCF52",
                      borderRadius: "200px",
                      borderBottomRightRadius:"0",
                      marginRight: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      wordBreak: "break-word",
                      height: "auto",
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <div
                  style={{
                    maxWidth: "300px",
                    paddingLeft: "10px",
                    marginTop: "10px",
                    fontSize: "1rem",
                  }}
                >
                  {message.name}
                </div>
                <div style={{ display: "flex", alignItems: "end" }}>
                  <div
                    key={message.id}
                    style={{
                      backgroundColor: "#D9D9D9",
                      maxWidth: "300px",
                      marginLeft:'10px',
                      borderRadius: "200px",
                      borderBottomLeftRadius:"0",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      wordBreak: "break-all",
                      height: "auto",
                    }}
                  >
                    {message.text}
                  </div>
                  <div
                    style={{
                      maxWidth: "300px",
                      textAlign: "end",
                      paddingLeft: "10px",
                      fontSize: "1rem",
                    }}
                  >
                    {message.date}
                  </div>
                </div>
              </React.Fragment>
            );
          }
        })}
      </div>
    </React.Fragment>
  );
};
