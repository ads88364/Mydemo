import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import 'bootstrap/dist/css/bootstrap.css';
import "jquery/dist/jquery";
import "jquery-ui/dist/jquery-ui";
import "jquery-ui-css/jquery-ui";

// 其他引入的組件

//#
import Home from "./page/home"; // 首頁
import Navbar2 from "./components/Home/navbar2/navbar2"; // 導覽列
import Footer from "./components/Home/footer/footer"; // 頁尾
import Returnqu from "./components/returnqu/returnqu"; //問題回報
import Backstage from "./components/Backstage/Backstage";

//阿條
import Up from "./components/up/up"; //快速上架
import RegistrationForm from "./page/register"; //註冊
import LoginForm from "./page/login"; //登入
import ForgotPassword from "./components/login/forget"; //忘記密碼
import ResetPassword from "./components/login/reset"; //密碼重置
import MemberCenter from "./page/Personaldata"; //個人頁面
import Bouble from "./components/bouble/bouble"; //

//日立
import Product from "./page/product"; //商品一覽
import ProductItem from "./page/productItem"; //商品頁面
import ProductSeller from "./page/productSeller"; //賣家頁面
import ProductCollect from "./page/productCollect"; //收藏

//酋長
import Cart from "./components/cart/index";

//阿宋
import Aboutus from "./page/aboutus";
import Order from "./page/order";
import Cmmgmt from "./page/cmmgmt";
import NotFound from "./page/NotFound";

const App = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);

      setTimeout(() => {
        setShow1(true);
      },4000)

    },50);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Router>
        {show && <Navbar2 />}
        {/* <Navbar2 /> */}
        <Bouble />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Returnqu" element={<Returnqu />} />
          <Route path="/Backstage" element={<Backstage />} />

          <Route path="/up" element={<Up />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/Member" element={<MemberCenter />} />
          <Route path="/forget" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/product" element={<Product />} />
          <Route path="/productItem/:id" element={<ProductItem />} />
          <Route path="/productSeller/:account" element={<ProductSeller />} />
          <Route path="/productCollect/:account" element={<ProductCollect />} />

          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cmmgmt" element={<Cmmgmt />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        {show1 && <Footer />}
        {/* <Footer /> */}
      </Router>
    </>
  );
};

export default App;
