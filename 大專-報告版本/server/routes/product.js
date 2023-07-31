var express = require('express');
var router = express.Router();
var conn = require('./db');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

router.post('/api/google-login', async (req, res) => {
    const { credential } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: "570382147021-8fsv658iibb1p1va1malkt5ppq7ll8v3.apps.googleusercontent.com", // 設定你的 Google Client ID
        });
        const payload = ticket.getPayload();

        console.log(payload)
        res.json(payload);
    } catch (error) {
        console.error('Google 登入驗證失敗:', error);
        res.status(500).json({ success: false, message: 'Google 登入失敗' });
    }
});

router.post('/api/google-account', (req, res) => {
    const googleuserdata = req.body.googleuserdata;
    console.log(googleuserdata)
    const ratingsql = `
    INSERT INTO userinfo SET
    account = ?,
    name = ?,
    nickname = ?,
    email = ?,
    identityCard = UUID() ,
    phoneNumber = UUID();`


    conn.query(ratingsql, [googleuserdata.account, googleuserdata.name, googleuserdata.nickname, googleuserdata.email], (err, data) => {
        err ? console.log('插入失敗') : res.status(200).json(data)
    })
})



//product
router.get('/api/products', (req, res) => {
    const query = `
      SELECT p.*, (
          SELECT im.imageSrc
          FROM imagemap AS im
          WHERE im.productId = p.productId
          LIMIT 1
      ) AS imageSrc,
      pcm.productCategoryID
      FROM product AS p
      JOIN productcategorymap AS pcm ON pcm.productCategoryChild = p.productCategoryChild
      ORDER BY RAND();
  `;
    conn.query(query, (error, results) => {
        if (error) { console.log(error, '資料庫查詢失敗') }
        res.json(results);
    });
});


//產品頁面跳轉
router.get('/api/productItem/:id', (req, res) => {
    const Pid = req.params.id;
    const query = `
      SELECT p.*,im.imageSrc
      FROM product p
      JOIN imagemap im ON p.productId = im.productId
      WHERE p.productId = ?;
  `;
    conn.query(query, [Pid], (err, data) => {
        err ? '查詢失敗' : res.json(data)
    });
})

//賣家頁面
router.get('/api/productseller/:id', (req, res) => {
    const id = req.params.id
    const sql = `
    SELECT u.profilePictureSrc, u.account ,u.nickname, u.email
    FROM product p
    INNER JOIN userinfo u ON p.productAccount = u.account
    WHERE p.productId = ?;
    `

    conn.query(sql, [id], (err, data) => {
        err ? console.log('查詢失敗') : res.json(data)
    })
})

//評分內容
router.get('/api/productRating/:id', (req, res) => {
    const id = req.params.id
    const sql = `
    SELECT r.*, u.profilePictureSrc
    FROM ratings r
    INNER JOIN userinfo u ON r.buyer = u.account
    WHERE r.productId = ?
    ORDER BY r.RatingDate DESC;
    `
    conn.query(sql, [id], (err, data) => {
        err ? console.log('查詢失敗') : res.json(data)
    })
})



//分類推薦
router.get('/api/productsCategory', (req, res) => {
    // const child = req.params.productCategoryChild;
    const child = req.query.param1;
    const productId = req.query.param2;
    const query = `
        SELECT p.*, (
            SELECT im.imageSrc
            FROM imagemap AS im
            WHERE im.productId = p.productId
            LIMIT 1
        ) AS imageSrc
        FROM product AS p
        WHERE p.productCategoryChild IN (
            SELECT pcm.productCategoryChild
            FROM productcategorymap AS pcm
            WHERE pcm.productCategoryId = (
                SELECT productCategoryId
                FROM productcategorymap
                WHERE productCategoryChild = ?
            )
        )
        AND p.productId NOT IN (?)
        ORDER BY RAND();
      
    `
    conn.query(query, [child, productId], (err, data) => {
        err ? console.log('查詢失敗') : res.json(data)
    })
})


//收藏
router.get('/api/collect/:account', (req, res) => {
    const account = req.params.account
    const sql = `
    SELECT p.*,
       (SELECT im.imageSrc
        FROM imagemap im
        WHERE im.productId = f.productId
        LIMIT 1) AS imageSrc
        FROM favorites f
        INNER JOIN product p ON p.productId = f.productId
        WHERE f.account = ?
        ORDER BY f.createtime DESC;
    `

    conn.query(sql, [account], (err, data) => {
        err ? console.log('查詢失敗') : res.json(data)
    })
})


//收藏刪除
router.post('/api/productDelete', (req, res) => {
    const [productId, account] = req.body
    const deleteSql = 'DELETE FROM favorites WHERE productId = ? AND account = ?';

    conn.query(deleteSql, [productId, account], (err, data) => {
        err ? console.log('查詢失敗') : res.json(data)
    })
})


//賣家商品
router.get('/api/Pseller/:account', (req, res) => {
    const account = req.params.account
    const sql = `
    SELECT u.account, u.nickname, u.email, u.profilePictureSrc, u.phoneNumber, p.*,
    (SELECT im.imageSrc
    FROM imagemap im
    WHERE im.productId = p.productId
    LIMIT 1) AS imageSrc
    FROM userinfo u
    LEFT JOIN product p ON p.productAccount = u.account
    WHERE u.account = ?

    `
    conn.query(sql, [account], (err, data) => {
        err ? console.log('查詢失敗') : res.json(data)
    })
})


//加入收藏
router.post('/api/collect', (req, res) => {
    const { account, productId } = req.body
    const sql = 'SELECT * FROM favorites WHERE account = ? AND productId = ?';
    const insertsql = `INSERT INTO favorites(account, productId) VALUES (?,?)`
    conn.query(sql, [account, productId], (err, result) => {
        if (err) { console.log('查詢失敗') }
        if (result.length > 0) {
            return res.status(400).json({ error: '該項目已經被收藏過了' });
        } else {
            conn.query(insertsql, [account, productId], (err, data) => {
                err ? console.log('插入失敗') : res.status(200).json(data)
            })
        }
    })
})

//加入租物車
router.post('/api/insertCart', (req, res) => {
    const { account, productId, rentStart, rentEnd } = req.body
    const sql = 'SELECT * FROM cartmap WHERE account = ? AND productId = ?';
    const insertsql = `INSERT INTO cartmap(account, productId, rentStart, rentEnd) VALUES (?,?,?,?)`
    conn.query(sql, [account, productId], (err, result) => {
        if (err) { console.log('查詢失敗') }
        if (result.length > 0) {
            return res.status(400).json({ error: '該項目已在租物車中' });
        } else {
            conn.query(insertsql, [account, productId, rentStart, rentEnd], (err, data) => {
                err ? console.log('插入失敗') : res.status(200).json(data)
            })
        }
    })
})

//評分
router.post('/api/rating', (req, res) => {
    const ratingdata = req.body.ratingdata;
    const ratingsql = 'insert into ratings(rating,Comment,buyer,productId) value (?,?,?,?)';
    conn.query(ratingsql, [ratingdata.rating, ratingdata.Comment, ratingdata.buyer, ratingdata.productId], (err, data) => {
        err ? console.log('插入失敗') : res.status(200).json(data)
    })
})

router.post('/api/rating/select', (req, res) => {
    const selectRating = req.body.selectRating;
    const ratingsql = 'SELECT * FROM ratings WHERE productId = ? and Buyer = ?';
    conn.query(ratingsql, [selectRating.productId, selectRating.buyer], (err, data) => {
        err ? console.log('查詢失敗') : res.status(200).json(data)
    })
})




module.exports = router