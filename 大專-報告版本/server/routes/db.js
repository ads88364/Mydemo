var mysql = require('mysql')                      //接收連接資料庫功能
var coon = mysql.createConnection({               //連接資料庫
    host: 'localhost',                              //連接地址
    user: "root",                                //使用者名稱
    password: "",                            //密碼
    database: "hire"                             //連接資料庫名稱
})
module.exports = coon