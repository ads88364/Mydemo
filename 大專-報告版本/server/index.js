var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var urlencoded = bodyParser.urlencoded(({ extended: true }));
var sha1 = require('sha1');
var querystring = require('querystring');
var coon = require('./routes/db');
const app = express()
app.use(cors());
app.use(urlencoded);
app.use(express.json());
app.use(express.static("public"));

app.use("/img", express.static("public/img"));

const cart = require("./routes/cart");
app.use("/cart", cart);

const memcenter = require("./routes/memcenter");
app.use("/", memcenter);

const product = require("./routes/product");
app.use("/", product);

const login = require('./routes/login')
app.use('/', login)

const member = require('./routes/memeber')
app.use('/',member)



const send = require('./routes/send')
app.use("/",send)



app.listen(8000, function () {
  // console.clear()
  console.log(new Date().toLocaleString());
});



// ==即時通訊====================================================================================
let users = [];
const { Server } = require("socket.io");
const server = require("http").Server(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  
  console.log(`${socket.id} 用户已连接!`);
  socket.on("disconnect", () => {
    console.log(`${socket.id}用户已断开连接`);
  });

  socket.on("newUser", (data) => {
    // 添加新用户到 users 中
    users.push(data);
    // console.log(users);
    // 发送用户列表到客户端
    io.emit("newUserResponse", users);
  });
  
  socket.on("message", (data) => {
    const newdata={...data}
    newdata.date=new Date().getHours()+':'+new Date().getMinutes().toString().padStart(2,'0')
    io.emit(data.roomName, newdata);
  });
});
server.listen(9000, function () {
  // console.clear();
  console.log(new Date().toLocaleString());
});
