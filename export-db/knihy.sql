-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2026 at 09:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `knihy`
--

-- --------------------------------------------------------

--
-- Table structure for table `kniznica`
--

CREATE TABLE `kniznica` (
  `id` int(11) NOT NULL,
  `nazov` varchar(150) NOT NULL,
  `autor` varchar(120) NOT NULL,
  `rok` int(11) NOT NULL,
  `cena` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kniznica`
--

INSERT INTO `kniznica` (`id`, `nazov`, `autor`, `rok`, `cena`) VALUES
(1, 'Hobit', 'Tolkien', 1937, 12.50),
(2, '1984', 'Orwell', 1949, 9.90),
(3, 'Duna', 'Herbert', 1966, 18.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kniznica`
--
ALTER TABLE `kniznica`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kniznica`
--
ALTER TABLE `kniznica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
