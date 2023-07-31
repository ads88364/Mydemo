-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-07-05 15:54:18
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
-- 資料表結構 `imagemap`
--

CREATE TABLE `imagemap` (
  `imageSrc` varchar(50) NOT NULL,
  `name` varchar(30) NOT NULL,
  `productId` int(20) NOT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT 0,
  `createTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `imagemap`
--

INSERT INTO `imagemap` (`imageSrc`, `name`, `productId`, `isDelete`, `createTime`, `updateTime`) VALUES
('diving/divingAccessories1 (1).jpg', '', 1, 0, '2023-07-05 07:26:43', '2023-07-05 07:28:30'),
('diving/divingAccessories1 (2).jpg', '', 1, 0, '2023-07-05 07:26:43', '2023-07-05 07:28:30'),
('diving/divingAccessories1 (3).jpg', '', 1, 0, '2023-07-05 07:26:43', '2023-07-05 07:28:30'),
('diving/divingAccessories1 (4).jpg', '', 1, 0, '2023-07-05 07:26:43', '2023-07-05 07:28:30'),
('diving/divingFins1 (1).jpg', '', 2, 0, '2023-07-05 07:49:20', '2023-07-05 07:49:20'),
('diving/divingFins1 (2).jpg', '', 2, 0, '2023-07-05 07:49:20', '2023-07-05 07:49:20'),
('diving/divingFins1 (3).jpg', '', 2, 0, '2023-07-05 07:49:20', '2023-07-05 07:49:20');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `imagemap`
--
ALTER TABLE `imagemap`
  ADD PRIMARY KEY (`imageSrc`),
  ADD KEY `productId` (`productId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
