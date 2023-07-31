const express = require('express');
const cors = require('cors');
const multer = require('multer');
const router = express.Router();
const coon = require('./db');
router.use(cors());
router.use(express.json());
const path = require('path');
router.get('/api/mypro/:account', function (req, res) {
  const account = req.params.account;
  // console.log(req.params)
  const query = `
    SELECT p.productId, p.rent, p.deposit, p.productName, p.state, p.rentalStatus, p.productId, i.imageSrc
    FROM product AS p
    INNER JOIN imagemap AS i ON p.productId = i.productId
    WHERE p.productAccount = ? 
  `;
  coon.query(query, [account], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// 編輯商品
router.patch('/api/updateProduct/:productId', function (req, res) {
  const productId = req.params.productId;
  const { productName, rent, deposit } = req.body; // 從請求中取得更新後的商品名稱、租金和押金

  const query = `
    UPDATE product
    SET productName = ?, rent = ?, deposit = ?
    WHERE productId = ?
  `;
  coon.query(query, [productName, rent, deposit, productId], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "商品更新成功。" });
    }
  });
});


// 下架商品
router.delete('/api/deleteProduct/:productId', function (req, res) {
  const productId = req.params.productId;

  const query = `
    DELETE FROM product
    WHERE productId = ?
  `;
  coon.query(query, [productId], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "商品刪除成功。" });
    }
  });
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img'); // Set the destination folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.random() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// Handle image upload
router.post('/api/public/img', upload.single('image'), function (req, res) {
  try {
    // 獲取前端傳送的圖片檔案的路徑
    const imagePath = req.file.path;
    // Respond with the image path or any other data you want
    res.status(200).json({ success: true, imageUrl: imagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.post('/api/fastup/:account', function (req, res) {
  const formData = req.body; // This will contain the form data sent from the frontend
  console.log(formData);
  // 進行了解構賦值的操作，將 formData 物件中的特定屬性拆解成獨立的變數
  // 將前端發送的請求中獲取的表單資料的特定屬性提取出來
  const {
    productName, rent, deposit, user, productCategoryChild, accessory,
    cityCounty, area, productDetail
  } = formData;
  // Insert data into "product" table
  const proInsert = `
    INSERT INTO product (productName, rent, deposit, productAccount, productCategoryChild, accessory, cityCounty, area, productDetail)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  coon.query(
    proInsert,
    [
      productName, rent, deposit, user, productCategoryChild, accessory,
      cityCounty, area, productDetail
    ],
    function (error, productResults) {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // 假設在“productResults.insertId”中有新插入的productId
        const productId = productResults.insertId;
        const imageInsert = `
          INSERT INTO imagemap (productId, imageSrc)
          VALUES (?, ?)
        `;
        const url = formData.image; // Assuming formData.image is the URL or file path
        const filename = url.split('\\')[2] // Get the filename with extension
        coon.query(
          imageInsert,
          [productId, filename], // Assuming req.file contains the uploaded image file path
          function (imageError, imageResults) {
            if (imageError) {
              console.error(imageError);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              // Respond with success message or any other data you want
              res.status(200).json({ success: true, message: 'Data inserted successfully' });
            }
          }
        );
      }
    }
  );
});


router.get("/api/myorder/:account", function (req, res) {
  const account = req.params.account;
  const query = `
    SELECT t.tradeitemId, t.account, t.productAccount, t.state, m.rentStart, m.rentEnd, p.productName, p.rent, p.deposit,p.productId, i.imageSrc
    FROM tradeitem AS t
    INNER JOIN tradeitemmap AS m ON t.tradeitemId = m.tradeitemId
    INNER JOIN product AS p ON m.productId = p.productId
    INNER JOIN imagemap AS i ON p.productId = i.productId
    WHERE t.account = ?
    GROUP BY p.productId
    ORDER BY t.tradeitemId
  `;
  coon.query(query, [account], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});
router.get('/api/myrent/:productAccount', function (req, res) {
  const productAccount = req.params.productAccount;
  const query = `
    SELECT t.tradeitemId, t.account, t.productAccount, t.state, m.rentStart, m.rentEnd, p.productName, p.productId, p.rent, p.deposit, i.imageSrc
    FROM tradeitem AS t
    INNER JOIN tradeitemmap AS m ON t.tradeitemId = m.tradeitemId
    INNER JOIN product AS p ON m.productId = p.productId
    INNER JOIN imagemap AS i ON p.productId = i.productId
    WHERE t.productAccount = ?
    GROUP BY p.productId
    ORDER BY t.tradeitemId
  `;
  coon.query(query, [productAccount], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});
router.post("/api/cancelOrder", function (req, res) {
  const { tradeitemId } = req.body;
  // 檢查 tradeitemId 的值
  // console.log("Received tradeitemId:", tradeitemId);
  const updateQuery = "UPDATE tradeitem SET state = 4 WHERE tradeitemId = ?";
  coon.query(updateQuery, [tradeitemId], function (error, results) {
    if (error) {
      // console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Order canceled successfully" });
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    }
  });
});
router.post('/api/agreeOrder', function (req, res) {
  const { tradeitemId } = req.body;
  // 使用 JOIN 來執行兩個更新動作
  const updateQuery = `
    UPDATE tradeitem AS t
    JOIN tradeitemmap AS tm ON t.tradeitemId = tm.tradeitemId
    JOIN product AS p ON tm.productId = p.productId
    SET t.state = 1,
        p.rentalStatus = "出租中"
    WHERE t.tradeitemId = ?
  `;
  coon.query(updateQuery, [tradeitemId], function (error, results) {
    if (error) {
      // console.log(error);
      res.status(500).json({ message: 'Error occurred while updating tradeitem and product' });
    } else {
      res.status(200).json({ message: 'Order canceled successfully' });
    }
  });
});
module.exports = router;