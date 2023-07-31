// orderUtils.js
// export const getOrderStatus = (state) => {
//     if (state === 0) {
//       return '等待回應中';
//     } else if (state === 1) {
//       return '等待租借中';
//     } else if (state === 2) {
//       return '租借中';
//     } else if (state === 3) {
//       return '已完成';
//     } else if (state === 4) {
//       return '已取消';
//     }
//   };
  // 商品名稱字數限制
  export const limitProductName = (productName) => {
    const maxChars = 6;
    if (productName.length <= maxChars) {
      return productName;
    }
    const truncated = productName.substr(0, maxChars);
    const remainder = productName.substr(maxChars);
    return (
      <>
        {truncated}
        <br />
        {remainder}
      </>
    );
  };
  // 計算天數
  export const calculateDays = (rentStart, rentEnd) => {
    const start = new Date(rentStart);
    const end = new Date(rentEnd);
    const timeDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return timeDiff;
  };  