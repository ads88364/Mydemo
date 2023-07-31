var express = require('express');
const multer = require('multer');
var router = express.Router();
var conn = require('./db');


// =============================================================================


// 修改會員資料
router.put('/CGuser', (req, res) => {
   const sql = "UPDATE userinfo SET gender = ?, birthday = ?, identityCard = ? WHERE userinfo.account = ?";
   conn.query(sql, [req.body.gender, req.body.birthday, req.body.identityCard, req.query.account],
      (err) => {
         if (err) {
            console.log(err);
            res.end();
         } else {
            res.end();
         };
      });
   console.log(req.query)
});


// =============================================================================


// 停權&復權會員資料
router.put('/BSuser', (req, res) => {
   const sql = "UPDATE userinfo SET isDelete = ? WHERE userinfo.account = ?";
   conn.query(sql, [req.body.isDelete, req.query.account],
      (err) => {
         if (err) {
            console.log(err);
            res.end();
         } else {
            res.end();
         };
      });
   console.log(req.query.account)
});


// =============================================================================



// 抓取使用者資料
router.get("/BSuser", (req, res) => {
   const sql = "SELECT * FROM userinfo "
   conn.query(sql, (err, data) => {
      err ? console.log("查詢失敗") : res.json(data)
   })
})


// =============================================================================


// 抓會員email帳號
router.get("/email/:account", (req, res) => {

   // 確定抓到會員帳號
   const account = req.params.account
   console.log(account);

   // sql執行會員帳號查詢 sql的?跟[account]做綁定
   const sql = "SELECT u.email FROM userinfo as u WHERE account =?"
   conn.query(sql, [account], (err, data) => {
      err ? console.log("查詢失敗") : res.json(data)
   })
})





// =============================================================================

// 問題回報寄信
// img storage path(儲存)
const imgconfig = multer.diskStorage({
   // 設定路徑
   destination: (req, file, cb) => {
      cb(null, "public/testimg")
   },
   // 自訂上傳檔案名稱
   filename: (req, file, cb) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      cb(null, `${year}_${month}_${date}_${hours}點${minutes}分.${file.mimetype.split("/")[1]}`)
   }
})

// img filter(篩選) 寫法1
// const isImage = (req, file, cb) => {
//    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       cb(new Error('Please upload an image'))
//    }
//    cb(null, true)
// }
// img filter(篩選) 寫法2
// const isImage = (req, file, cb) => {
//    if (file.mimetype.startswith("image/jpeg")) {
//       cb(null, true)
//    } else (
//       cb(new Error("請上傳image或jpege格式"))
//    )
// }




const upload = multer({
   // 1.存照片
   storage: imgconfig,

   // 2.篩選
   // fileFilter: isImage,

   // 3.上傳限制
   // dest: 'uploads/',
   // limits: {
   //    fileSize: 10 * 1024 * 1024, 
   // }
});


// 用base64編碼傳到後端
// const imgToBase64 = (target, func) => {
//    const reader = new FileReader();
//    reader.readAsDataURL(target);
//    reader.onload = (e) => func(e.target.result);
// };









// 寄送信件
const nodemailer = require("nodemailer");
const coon = require('./db');

const transporter = nodemailer.createTransport({

   service: "gmail",
   auth: {
      user: "hireoutdoor2023@gmail.com",
      pass: "kvyceagpbrdesstl"
   }
});


router.post('/send', upload.any(), (req, res) => {

   console.log(req.files[0]);
   // const {file} = req.file;
   // console.log(file);



   const mailOptions = {
      from: "hireoutdoor2023@gmail.com",
      to: "hireoutdoor2023@gmail.com",
      subject: "Nodemailer Test",
      html: `

   <html lang="en">
   <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        
      @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400);
    
      body {
         font-family: 'Lato', sans-serif;
         background: #e2dedb;
         color: #b3aca7;
      }

      header {
         position: relative;
         margin: 100px 0 25px 0;
         font-size: 2.3em;
         text-align: center;
         letter-spacing: 7px;
      }

      #form {
         position: relative;
         width: 500px;
         margin: 50px auto 100px auto;
      }

      input {
         font-family: 'Lato', sans-serif;
         font-size: 0.875em;
         width: 470px;
         height: 50px;
         padding: 0px 15px 0px 15px;

         background: transparent;
         outline: none;
         color: #726659;

         border: solid 1px #b3aca7;
         border-bottom: none;
      }
  
      textarea {
         width: 470px;
         max-width: 470px;
         height: 110px;
         max-height: 110px;
         padding: 15px;

         background: transparent;
         outline: none;

         color: #726659;
         font-family: 'Lato', sans-serif;
         font-size: 0.875em;

         border: solid 1px #b3aca7;
      }

      #img{
         width: 470px;
         height: 470px;
      }

    </style>
   </head>

   <body>
    <header>PROBLEM REPORT</header>
    <form id="form" class="topBefore">
        <input id="name" type="text" placeholder="NAME" value="${req.body.account}" readonly>
        <input id="email" type="text" placeholder="E-MAIL" value="${req.body.email}" readonly>
        <textarea id="message" type="text" placeholder="MESSAGE" readonly>${req.body.text}</textarea>
    </form>

    <img src="cid:01" alt="" style="width: 300px;height:auto">


   </body>
   </html>

   `,
   //      attachments: [
   //       {
   //          filename: `問題回報照片${req.files[0].filename}`,        // 附件檔案名稱
   //          // path: `${req.body.img}`,     // 照片的檔案路徑
   //          path: req.files[0].path,        // 照片的檔案路徑
   //          cid: "01"
   //       },
   //    ],
   // };



      attachments: req.files[0] ? [
         {
            filename: `問題回報照片${req.files[0].filename}`,        // 附件檔案名稱
            // path: `${req.body.img}`,     // 照片的檔案路徑
            path: req.files[0].path,        // 照片的檔案路徑
            cid: "01"
         },
      ] : [],
   };



   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error);
         res.send(error);
      } else {
         console.log("Email sent: " + info.response + '成功發送');
         res.json(info);
      }
   });
})


module.exports = router;