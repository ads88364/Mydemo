-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-07-05 15:54:50
-- 伺服器版本： 10.4.27-MariaDB
-- PHP 版本： 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `hire`
--

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `productId` int(20) NOT NULL,
  `productAccount` varchar(30) NOT NULL,
  `productCategoryChild` varchar(20) NOT NULL,
  `cityCounty` varchar(20) NOT NULL,
  `area` varchar(20) NOT NULL,
  `productName` varchar(20) NOT NULL,
  `accessory` varchar(20) DEFAULT NULL,
  `productDetail` varchar(200) DEFAULT NULL,
  `rent` int(5) NOT NULL,
  `deposit` int(5) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 0,
  `isDelete` tinyint(1) NOT NULL DEFAULT 0,
  `createTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rentalStatus` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`productId`, `productAccount`, `productCategoryChild`, `cityCounty`, `area`, `productName`, `accessory`, `productDetail`, `rent`, `deposit`, `state`, `isDelete`, `createTime`, `updateTime`, `rentalStatus`) VALUES
(1, '3x7Y90', 'divingAccessories', '台中市', '南屯區', '2mm 保暖浮潛／潛水襪', NULL, NULL, 743, 943, 0, 0, '2023-07-05 07:15:27', '2023-07-05 07:15:27', '出租中'),
(2, 'B28y4Sd', 'snorkelingSet', '台南市', '安南區', '成人初階舒適浮潛蛙鞋', NULL, NULL, 1523, 624, 0, 0, '2023-07-05 07:15:27', '2023-07-05 07:15:27', '未出租'),
(3, 'a6ZQ2M', 'divingMask', '高雄市', '左營區', '成人易呼吸全乾式浮潛面罩Easybrea', NULL, NULL, 1038, 1580, 0, 0, '2023-07-05 07:15:27', '2023-07-05 07:15:27', '出租中'),
(4, 'P39e5iR', 'divingFins', '新北市', '永和區', '成人浮潛／潛水單面鏡', NULL, NULL, 1732, 1269, 0, 0, '2023-07-05 07:15:27', '2023-07-05 07:15:27', '未出租'),
(5, 'f2KjT4Y1', 'divingSnorkel', '桃園市', '中壢區', '成人浮潛套腳式蛙鞋', NULL, NULL, 930, 754, 0, 0, '2023-07-05 07:15:27', '2023-07-05 07:15:27', '出租中'),
(6, 'dCn5G0Wx8', 'divingAccessories', '新竹市', '東區', '自由潛水面鏡', NULL, NULL, 1867, 1187, 0, 0, '2023-07-05 07:15:27', '2023-07-05 07:15:27', '未出租'),
(7, 'R9zKuqX75', 'divingAccessories', '基隆市', '中正區', '鋁製潛水探棒', NULL, NULL, 591, 1022, 0, 0, '2023-07-05 07:15:27', '2023-07-05 07:15:27', '出租中');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
