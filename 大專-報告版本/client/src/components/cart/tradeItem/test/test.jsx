export const createHiddenInput = (form, name, value) => {
  const hiddenField = document.createElement("input");
  hiddenField.type = "hidden";
  hiddenField.name = name;
  hiddenField.value = value;
  form.appendChild(hiddenField);
};
export const handleGetStore = (type) => {
  let method
  switch (type) {
    case 'SevenEleven':
      method='UNIMARTC2C'
      break;
    case 'FamilyMart':
      method='FAMIC2C'
      break;
    case 'OKMart':
      method='OKMARTC2C'
      break;
    case 'Hilife':
      method='HILIFEC2C'
      break;
  
    default:
      break;
  }
  const form = document.createElement("form");
  form.setAttribute("id", "getmap");
  form.setAttribute("target", "_blank");
  form.method = "POST";
  form.action = "https://logistics-stage.ecpay.com.tw/Express/map"; // 這是測試的網址，文件上會寫正式的是哪個網址
  createHiddenInput(form, "MerchantID", "2000933");
  createHiddenInput(form, "LogisticsType", "CVS");
  createHiddenInput(form, "LogisticsSubType", method);
  createHiddenInput(form, "IsCollection", "N");
  createHiddenInput(form, "ServerReplyURL", "http://localhost:8000/cart/cart");
  document.body.appendChild(form);
  form.submit()
  form.remove()
};