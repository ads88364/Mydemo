import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatBar = ({
  socket,
  removeRoom,
  setRoomName,
  setProductAccount,
  setMessages,
}) => {
  const [allRoomData, setAllRoomData] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:8000/cart/getChatList", {
        account: localStorage.getItem("userInfo").slice(1, -1),
      })
      .then((res) => {
        setAllRoomData([...res.data]);
      });
  }, []);
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
        borderRadius: 4,
      }}
    >
      {allRoomData.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              height: "40px",
              // borderBottom: "1px solid #0B7597",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "95%",
            }}
            className="cursorPointer p-1 btnColor2"
            onClick={async() => {
              socket.off(removeRoom);
              setRoomName(item.room);
              setProductAccount(item.productAccount);
              setMessages([]);
              await axios
                .post("http://localhost:8000/cart/upDateChatContain", {
                  account: localStorage.getItem("userName"),
                  productAccount: item.productAccount,
                })
                .then((res) => {
                  if (res.data !== "") {
                    const data = JSON.parse(res.data);
                    setMessages([...data]);
                  }
                });
            }}
          >
            {item.productAccount}
          </div>
        );
      })}
    </div>
  );
};

export default ChatBar;
