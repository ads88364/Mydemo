import axios from "axios";
export const checkForm = async (newstate) => {
  newstate.err.address = 0;
  newstate.err.payMethod = 0;
  newstate.err.cartInfo = 0;

  await newstate.tradeItem.map(async (item) => {
    if (!item.address) {
      newstate.err.address = 1;
      newstate.current = 1;
    } else if (!item.payMethod) {
      newstate.err.payMethod = 1;
      newstate.current = 1;
    } else if (item.payMethod === "Visa卡") {
      if (
        !item.creditCardNumber ||
        isNaN(Number(item.creditCardNumber)) ||
        item.creditCardNumber.length !== 16
      ) {
        newstate.err.cartInfo = 1;
        newstate.current = 1;
      } else if (!item.creadCartmonth) {
        newstate.err.cartInfo = 1;
        newstate.current = 1;
      } else if (!item.creditCardYear) {
        newstate.err.cartInfo = 1;
        newstate.current = 1;
      } else if (
        !item.cvc ||
        isNaN(Number(item.cvc)) ||
        item.cvc.length !== 3
      ) {
        newstate.current = 1;
        newstate.err.cartInfo = 1;
      }
    }
  });
  if (
    newstate.err.address === 0 &&
    newstate.err.payMethod === 0 &&
    newstate.err.cartInfo === 0
  ) {
    await axios
      .put("http://localhost:8000/cart/cart", {
        account: localStorage.getItem("userInfo").slice(1, -1),
        data: newstate,
      })
      .then((res) => {
        newstate.current = 2;
        newstate.tradeId = res.data;
        console.log(newstate.tradeId)
      });
  }
  return newstate;
};
