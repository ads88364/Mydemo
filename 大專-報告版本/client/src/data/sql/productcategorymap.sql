-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023 年 07 月 04 日 18:20
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

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
-- 資料表結構 `productcategorymap`
--

CREATE TABLE `productcategorymap` (
  `productCategoryChild` varchar(20) NOT NULL,
  `productCategoryId` varchar(10) NOT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT 0,
  `createTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `productcategorymap`
--

INSERT INTO `productcategorymap` (`productCategoryChild`, `productCategoryId`, `isDelete`, `createTime`, `updateTime`) VALUES
('backpack', 'mountain', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('ballSports', 'sportsLeis', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('bicycle', 'cycling', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('bicycleAccessories', 'cycling', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('bikeLight', 'cycling', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('camera', 'photograph', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('climbingEquipment', 'mountain', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('divingAccessories', 'diving', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('divingFins', 'diving', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('divingMask', 'diving', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('divingSnorkel', 'diving', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('fitnessEquipment', 'sportsLeis', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('gripEquipment', 'mountain', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('helmet', 'cycling', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('hikingShoes', 'mountain', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('kayak', 'waterSport', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('leisureEntertainment', 'sportsLeis', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('lens', 'photograph', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('luggageRack', 'cycling', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('moisturePad', 'camping', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('mountainAccessories', 'mountain', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('outdoorRecreation', 'sportsLeis', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('outdoorStove', 'camping', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('paddleBoat', 'waterSport', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('photographyAccessori', 'photograph', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('picnicTableChair', 'camping', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('sailboard', 'waterSport', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('shootingEquipment', 'photograph', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('ski', 'skiing', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('skiAccessories', 'skiing', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('skiBoots', 'skiing', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('skiClothing', 'skiing', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('sleepingBag', 'camping', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('snorkelingEquipment', 'waterSport', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('snorkelingSet', 'diving', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('snowboard', 'skiing', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('sportsAccessories', 'sportsLeis', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('swimmingEquipment', 'waterSport', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('tent', 'camping', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45'),
('tripod', 'photograph', 0, '2023-07-04 16:19:45', '2023-07-04 16:19:45');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `productcategorymap`
--
ALTER TABLE `productcategorymap`
  ADD PRIMARY KEY (`productCategoryChild`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
