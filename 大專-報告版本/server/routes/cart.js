//接收開啟伺服器功能
var express = require("express");
var coon = require("./db");
const { json } = require("body-parser");
//小組管理專案分工需要架設分業系統(暫定解釋)
var page = express.Router();
//開始架設份派到自己的業務

page.put("/cart", async (req, res) => {
  let cartMapId = [];
  let insertLenght = "";
  const valuesList = [];
  req.body.data.tradeItem.map((item) => {
    let shippingMethod = "";
    switch (item.shippingMethod) {
      case "SevenEleven":
        shippingMethod = "7-11取貨";
        break;
      case "FamilyMart":
        shippingMethod = "全家取貨";
        break;
      case "OKMart":
        shippingMethod = "OK取貨";
        break;
      case "Hilife":
        shippingMethod = "萊爾富取貨";
        break;
      case "BlackCat":
        shippingMethod = "黑貓宅急便";
        break;

      default:
        shippingMethod = item.shippingMethod;
        break;
    }
    valuesList.push(req.body.account);
    valuesList.push(item.productAccount);
    valuesList.push(shippingMethod);
    valuesList.push(item.tradeTypePriceId);
    valuesList.push(item.payMethod);
    valuesList.push(item.address);
    insertLenght += "( ?, ?, ?, ?, ?, ?),";
  });
  coon.query(
    `INSERT INTO tradeitem ( account, productAccount, tradeType, tradeTypePriceId, payType, address ) VALUES ${insertLenght.slice(
      0,
      -1
    )}`,
    valuesList,
    (err, data) => {
      let insertId = [];
      let valuesList2 = [];
      let insertLenght2 = "";
      req.body.data.tradeItem.map((item, index) => {
        insertId.push(data.insertId + index);
      });
      insertId.map((item, index) => {
        req.body.data.tradeItem[index].product.map((value) => {
          cartMapId.push(value.cartMapId);
          valuesList2.push(item);
          valuesList2.push(value.productId);
          valuesList2.push(value.rentStart);
          valuesList2.push(value.rentEnd);
          insertLenght2 += "(?,?,?,?),";
        });
      });
      coon.query(
        `INSERT INTO tradeitemmap (tradeItemId, productId, rentStart, rentEnd) VALUES ${insertLenght2.slice(
          0,
          -1
        )}`,
        valuesList2,
        (err, result) => {
          let insertLenght3 = "";
          cartMapId.map((item) => {
            insertLenght3 += item + " or ";
          });
          insertLenght3 = insertLenght3.slice(0, -3);
          console.log(insertLenght3)
          coon.query(
            `DELETE FROM cartmap WHERE cartmap.cartMapId = ${insertLenght3}`,
            [],
            (err, result) => {
              if (err) {
                res.send(err);
              } else {
                res.send(insertId);
              }
            }
          );
        }
      );
    }
  );
});

//取得使用者購物車資料
page.post("/getCartItem", function (req, res) {
  coon.query(
    `SELECT * FROM cartmap INNER join product ON cartmap.productId=product.productId INNER join imagemap ON product.productId=imagemap.productId INNER join userinfo ON product.productAccount=userinfo.account WHERE cartmap.account=?`,
    [req.body.account],
    (err, result) => {
      //最後要輸出的資料放這邊
      let cartMap = [];
      let num = [];
      let count = [];
      let newdata = [];
      let productAccountList = [];
      //為了防止最後物件出現RowDataPacket先字串化
      let string = JSON.stringify(result);
      //變回物件
      let data = JSON.parse(string);
      //過濾重複單號
      data.map((value) => {
        num.push(value.cartMapId);
      });
      num.map((value, index) => {
        num.indexOf(value) === index && count.push(index);
      });
      count.map((value) => {
        data.map((item, number) => {
          value === number && newdata.push(item);
        });
      });
      //整理出租者名單
      newdata.map((el, index) => {
        newdata[index].rentStart = new Date(el.rentStart).toLocaleDateString();
        newdata[index].rentEnd = new Date(el.rentEnd).toLocaleDateString();
        newdata[index].day =
          Math.abs(new Date(el.rentStart) - new Date(el.rentEnd)) /
          (1 * 60 * 60 * 24 * 1000);
        newdata[index].total =
          newdata[index].rent * newdata[index].day + newdata[index].deposit;
        productAccountList.push(el.productAccount);
      });
      productAccountList = productAccountList.filter((value, index, arr) => {
        return arr.indexOf(value) === index;
      });
      //根據出租者做商品歸類
      productAccountList.map((productAccountName, index) => {
        cartMap.push({
          productAccount: productAccountName,
          product: [],
        });
        newdata.map((el) => {
          productAccountName === el.productAccount &&
            cartMap[index].product.push({
              cartMapId: el.cartMapId,
              productId: el.productId,
              productName: el.productName,
              imageSrc: el.imageSrc,
              rent: el.rent,
              deposit: el.deposit,
              rentStart: el.rentStart,
              rentEnd: el.rentEnd,
              day: el.day,
              total: el.total,
              productCity: el.productCity,
              name: el.name,
              identityCard:
                el.identityCard.substring(0, 1).toUpperCase() +
                el.identityCard
                  .substring(el.identityCard.length - 3)
                  .padStart(9, "x"),
              address: el.address,
              phoneNumber: el.phoneNumber,
              email: el.email,
            });
        });
      });
      res.send(cartMap);
    }
  );
});

page.post("/getAccountInfo", (req, res) => {
  coon.query(
    `SELECT * FROM userinfo WHERE account=?`,
    [req.body.account],
    (err, result) => {
      const sendToFrontInfo = {};
      sendToFrontInfo.name = result[0].name;
      sendToFrontInfo.identityCard =
        result[0].identityCard.substring(0, 1).toUpperCase() +
        result[0].identityCard
          .substring(result[0].identityCard.length - 3)
          .padStart(9, "x");
      sendToFrontInfo.address = result[0].address;
      sendToFrontInfo.phoneNumber = result[0].phoneNumber;
      sendToFrontInfo.email = result[0].email;
      res.send(sendToFrontInfo);
    }
  );
});

page.delete("/delete/:cartMapId", (req, res) => {
  coon.query(
    `DELETE FROM cartmap WHERE cartmap.cartMapId = ?`,
    [req.params.cartMapId],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

page.post("/cart", async (req, res) => {
  let a = JSON.stringify(req.body);
  res.cookie("address", `${JSON.stringify(a)}`);
  res.send("<script>window.close();</script >");
});

page.post("/getChatList", (req, res) => {
  const sql = `SELECT * FROM chatroom WHERE account=? or productAccount=?`;
  coon.query(sql, [req.body.account, req.body.account], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const allRoom = [];
      result.map((item) => {
        req.body.account === item.account
          ? allRoom.push({
            room: item.room,
            productAccount: item.productAccount,
          })
          : allRoom.push({ room: item.room, productAccount: item.account });
      });
      res.send(allRoom);
    }
  });
});

page.put("/upDateChatContain", (req, res) => {
  const sql = `UPDATE chatroom  SET contain = ? WHERE (account = ? AND productAccount = ?) OR (account = ? AND productAccount = ?)`;
  const account = req.body.account;
  const productAccount = req.body.productAccount;
  const contain = JSON.stringify(req.body.contain);
  coon.query(
    sql,
    [contain, account, productAccount, productAccount, account],
    (err, result) => {
      err ? res.send(err) : res.send(result);
    }
  );
});

page.post("/upDateChatContain", async (req, res) => {
  const sql = `SELECT * FROM chatroom  WHERE (account = ? AND productAccount = ?) OR (account = ? AND productAccount = ?);`;
  const account = req.body.account;
  const productAccount = req.body.productAccount;
  coon.query(
    sql,
    [account, productAccount, productAccount, account],
    (err, result) => {
      if (result.length !== 0) {
        err ? res.send(err) : res.send(JSON.stringify(result[0].contain));
      }
    }
  );
});

page.post("/chatInfo", (req, res) => {
  const sql = `SELECT * FROM chatroom WHERE (account=? AND productAccount=?) or(account=? AND productAccount=?)`;
  const account = req.body.account;
  const productAccount = req.body.productAccount;
  coon.query(
    sql,
    [account, productAccount, productAccount, account],
    (err, result) => {
      if (result.length === 0) {
        const sql2 = `INSERT INTO chatroom ( account , productAccount , room) VALUES (?,?,?)`;
        const roomName = account + productAccount + Math.random();
        coon.query(sql2, [account, productAccount, roomName], (errr) => {
          if (errr) {
            res.send(errr);
          } else {
            res.send(roomName);
          }
        });
      } else {
        res.send(result[0].room);
      }
    }
  );
});

//輸出檔案給人彙整
module.exports = page;
//結束
