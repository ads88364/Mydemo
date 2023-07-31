var express = require('express');
var router = express.Router();
var coon = require('./db');
const multer = require('multer');
const bcrypt = require('bcrypt');

//基本資料
router.get('/api/members/:account', (req, res) => {
    const memberData = req.body;
    const selectQuery = `SELECT * FROM userinfo WHERE account = ?`;

    coon.query(
        "SELECT * FROM userinfo WHERE account=?",
        [req.params.account],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    );
});


//修改資料
router.put('/api/members/account', (req, res) => {
    const updatedData = req.body[0];


    const update = `UPDATE userinfo 
    SET name = ?,
    nickname = ?, 
    identityCard = ?,
    phoneNumber = ?,
    email = ?
    WHERE account = ?`;
    coon.query(update, [
        updatedData.name,
        updatedData.nickname,
        updatedData.identityCard,
        updatedData.phoneNumber,
        updatedData.email,
        updatedData.account
    ], (err, result) => {
        // console.log(result);
        if (err) {
            console.error('数据库错误:', err);
            res.status(500).json({ message: '数据库错误' });
        } else {
            if (result) {
                res.status(200).json(updatedData);
            }
        }
    });
});


//修改圖片
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/profilePictureSrc');//資料夾
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)//檔名
    },
});

const upload = multer({ storage });

router.post('/upload-photo', upload.single('photo'), (req, res) => {
    const photoPath = `profilePictureSrc/${req.file.filename}`;

    // console.log('Photo saved at:', photoPath);
    // console.log(photoPath2);

    const account = req.body.account;
    const updatePhotoQuery = `UPDATE userinfo SET profilePictureSrc = ? WHERE account = ?`;

    coon.query(updatePhotoQuery, [photoPath, account], (err, result) => {
        if (err) {
            console.error('資料庫錯誤:', err);
        } else {
            if (result.affectedRows > 0) {
                res.json({ success: true });
            } else {
                res.status(404).json({ message: '找不到帳號' });
            }
        }
    });
});




//修改密碼
router.post('/api/change-password', async (req, res) => {
  const { account, oldPassword, newPassword } = req.body;
  try {
      // 從資料庫中查詢使用者資料
      const query = 'SELECT * FROM userinfo WHERE account = ?';
      coon.query(query, [account], async (err, results) => {
          if (err) throw err;
          
          if (results.length === 0) {
              return res.status(404).json({ message: '找不到該使用者' });
            }
            
            const account = results[0];

      // 比對舊密碼是否正確
      const passwordMatch = await bcrypt.compare(oldPassword, account.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: '舊密碼不正確' });
      }

      // 更新新密碼
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const updateQuery = 'UPDATE userinfo SET password = ? WHERE account = ?';
      coon.query(updateQuery, [hashedNewPassword, account.account], (err, updateResult) => {
        if (err) throw err;
        return res.sendStatus(200).end();
      });
    });
  } catch (error) {
  
    return res.sendStatus(500).end();
  }
});



module.exports = router