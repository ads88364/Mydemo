import React, { useState } from "react";
export default () => {
  const [id, setId] = useState("");
  const [name, setNameInput] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("userInfo")) {
      return alert("Name can't be empty");
    }
    setId(name);
    socket.emit("join", name, room);
  };

  return id !== "" ? (
    <div>Hello</div>
  ) : (
    <div style={{ textAlign: "center", margin: "30vh auto", width: "70%" }}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          id="name"
          onChange={(e) => setNameInput(e.target.value.trim())}
          required
          placeholder="你的名字 .."
        />
        <br />
        <input
          id="room"
          onChange={(e) => setRoom(e.target.value.trim())}
          placeholder="聊天室名稱 .."
        />
        <br />
        <button type="submit">送出</button>
      </form>
    </div>
  );
};
