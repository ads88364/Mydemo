var express = require('express');
var router = express.Router();
var coon = require('./db');
var bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const moment = require('moment');

//註冊
//驗證帳號
router.post('/api/register/account', (req, res) => {
  const query = 'SELECT * FROM userinfo WHERE account = ?'
  const { username } = req.body;
  coon.query(query, [username], (err, data) => {

    if (data.length > 0) {
      // 有重複帳號
      res.status(409).json({ error: '帳號已經存在' });
    } else {
      res.status(200).json({ message: '帳號可以使用' });
    }
  });


})
//驗證身分證
router.post('/api/register/validate', (req, res) => {
  const query = 'SELECT * FROM userinfo WHERE identityCard = ? OR email = ? OR phoneNumber = ?';
  const { identityCard, email, phoneNumber } = req.body;
  const duplicateData = {};

  coon.query(query, [identityCard, email, phoneNumber], (err, data) => {
    if (err) {

      res.status(500).json({ error: '伺服器內部錯誤' });
    } else {
      if (data.length > 0) {
        if (data.some((cheak) => cheak.identityCard === identityCard)) {
          duplicateData.identityCard = '身分證重複';
        }
        if (data.some((cheak) => cheak.email === email)) {
          duplicateData.email = 'email重複';
        }
        if (data.some((cheak) => cheak.phoneNumber === phoneNumber)) {
          duplicateData.phoneNumber = '手機號碼重複';
        }
        res.status(409).json({ error: '以下字段重複使用', duplicateData });
      } else {
        res.status(200).json({ message: '資訊可使用' });
      }
    }
  });
});

router.post('/api/register', async (req, res) => {
  const { aldata } = req.body;
  const a = 10;
  console.log(aldata)
  try {
    const aa = moment(aldata.birthday, 'YYYY-MM-DDTHH:mm:ss.sssZ');
    const adjustedDate = aa.add(8, 'hours');
    const formattedDate = adjustedDate.format('YYYY-MM-DD');
    const salt = await bcrypt.genSalt(a);
    const hashedPassword = await bcrypt.hash(aldata.password, salt);
    const sql = `INSERT INTO userinfo (account, password, phoneNumber, identityCard, email, salt, nickname, gender, name, birthday,	profilePictureSrc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
    const defaultAvatar = 'profilePictureSrc/hire.png'
    coon.query(
      sql,
      [
        aldata.username,
        hashedPassword,
        aldata.phoneNumber,
        aldata.identityCard,
        aldata.email,
        salt,
        aldata.nickname,
        aldata.gender,
        aldata.name,
        formattedDate,
        defaultAvatar
      ],
      (error, results) => {
        if (error) {
          console.error('資料庫操作錯誤', error);
          res.status(500).send('資料庫操作錯誤');
        } else {
          console.log('資料插入成功');
          res.send('OK');
        }
      }
    );
  } catch (error) {
    console.error('加密密碼時發生錯誤', error);
    res.status(500).send('加密密碼時發生錯誤');
  }
});

//登入
router.post('/api/login', async (req, res) => {
  const { account, password, isDelete } = req.body;
  const query = 'SELECT * FROM userinfo WHERE account = ?';
  coon.query(query, [account], async (err, results) => {
    if (err) {
      console.error('錯誤', err);
      res.status(500).send(' Server ErrorQQ');
    } else if (results.length > 0) {
      if (results[0].isDelete === 1) {
        console.log(results);
        return res.status(403).send('帳號已被停權，如有疑問請聯繫我們');
      }

      const hashedPassword = results[0].password;
      const administrator = account === 'qaz12345';
      //bcrypt 
      try {
        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
          //管理者成功
          if (administrator) {
            res.status(200).json({ administratorok: true });
            //管理者失敗
          } else {
            res.status(200).json({ administratorok: false });
          }
        } else {
          res.status(401).send('nooo');
        }
      } catch (error) {
        console.error('錯誤', error);
        res.status(500).send('錯誤QQ');
      }
    } else {
      // 使用者不存在
      res.status(401).send('nooo');
    }
  });
});


//忘記密碼
router.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  console.log(email);
  const aa = 'SELECT * FROM userinfo WHERE email =?'
  coon.query(aa, [email], async (err, results) => {
    if (err) {
      console.error('MySQL查詢錯誤：', err);
      return res.status(500).json({ message: '發生了一些錯誤，請稍後再試。' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: '該電子郵件地址未註冊。' });
    }

    // 生成JWT令牌
    const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });

    // 發送包含驗證連結的郵件
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // 例如：Gmail、Outlook、QQ等
      auth: {
        user: 'HireOutdoor2023@gmail.com',
        pass: 'kvyceagpbrdesstl',
      },
    });

    const mailOptions = {
      from: 'HireOutdoor2023@gmail.com',
      to: email,
      subject: '密碼重置請求',
      text: `請點擊以下鏈接重置密碼：\n\nhttp://localhost:3000/reset-password?token=${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('郵件發送失敗：', error);
        return res.status(500).json({ message: '發生了一些錯誤，請稍後再試。' });
      }

      console.log('郵件發送成功：', info.response);
      return res.status(200).json({ message: '郵件已發送。' });
    });
  }
  );
});

// 重置密碼
router.post('/api/reset-password', (req, res) => {
  const { password, token } = req.body;
  jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
    if (err) {
      console.error('jwt驗證錯誤', err);
      res.status(401).json({ error: 'Token verification failed' });
    }
    const { email } = decodedToken;

    const updateQuery = 'UPDATE userinfo SET password = ? WHERE email = ?';
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error('加密錯誤', hashErr);
        res.status(500).json({ error: 'Password hashing failed' });
      }

      coon.query(updateQuery, [hashedPassword, email], (updateErr, updateResults) => {
        if (updateErr) {
          console.error('MySQL錯誤：', updateErr);
          res.status(500).json({ error: 'Database error' })
        }

        console.log('密碼已修改');
        res.status(200).json({ message: 'Password updated successfully' });
      });
    });

  });
});




module.exports = router