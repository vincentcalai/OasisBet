-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: oasisbet
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_bet_trx`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_bet_trx` (
  `trx_id` varchar(15) NOT NULL,
  `acc_id` bigint NOT NULL,
  `event_id` bigint NOT NULL,
  `event_desc` varchar(100) NOT NULL,
  `comp_type` varchar(30) NOT NULL,
  `start_time` datetime NOT NULL,
  `bet_type` varchar(30) NOT NULL,
  `bet_selection` varchar(30) NOT NULL,
  `bet_amt` decimal(4,2) NOT NULL,
  `odds` double NOT NULL,
  `potential_return` double NOT NULL,
  `is_settled` tinyint(1) DEFAULT NULL,
  `trx_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`trx_id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_bet_trx`
--

/*!40000 ALTER TABLE `tb_bet_trx` DISABLE KEYS */;
INSERT INTO `tb_bet_trx` VALUES ('B/100000/100020',100000,1013,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','01',4.00,2.81,11.24,0,'2022-12-29 18:17:57'),('B/100000/100021',100000,1013,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','02',2.00,3.71,7.42,0,'2023-05-28 18:17:57'),('B/100000/100022',100000,1014,'Southampton vs Bournemouth','EPL','2023-04-29 02:45:00','01','02',5.00,3.46,17.3,0,'2023-05-28 18:17:57'),('B/100000/100023',100000,1016,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','01',1.00,2.81,2.81,0,'2023-05-28 18:29:14'),('B/100000/100024',100000,1017,'Southampton vs Bournemouth','EPL','2023-04-29 02:45:00','01','02',3.00,3.46,10.38,0,'2023-05-28 18:29:14'),('B/100000/100025',100000,1018,'Everton vs Newcastle United','EPL','2023-04-30 04:45:00','01','03',3.00,1.74,5.22,0,'2023-05-28 18:29:14'),('B/100000/100026',100000,1001,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','01',2.00,2.81,5.62,0,'2023-05-29 10:02:01'),('B/100000/100027',100000,1001,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','02',4.00,3.71,14.84,0,'2023-05-29 10:02:01'),('B/100000/100028',100000,1002,'Southampton vs Bournemouth','EPL','2023-04-29 02:45:00','01','02',6.00,3.46,20.76,0,'2023-05-29 10:02:01'),('B/100000/100032',100000,1010,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','01',2.00,2.81,5.62,0,'2023-05-29 10:16:08'),('B/100000/100033',100000,1011,'Southampton vs Bournemouth','EPL','2023-04-29 02:45:00','01','02',5.00,3.46,17.3,0,'2023-05-29 10:16:08'),('B/100000/100034',100000,1012,'Everton vs Newcastle United','EPL','2023-04-30 04:45:00','01','02',2.00,3.85,7.7,0,'2023-03-30 10:16:08'),('B/100000/100049',100000,1000000,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','01',1.00,2.81,2.81,0,'2023-06-06 09:48:35'),('B/100000/100050',100000,1000001,'Southampton vs Bournemouth','EPL','2023-04-29 02:45:00','01','02',2.50,3.46,8.65,0,'2023-06-06 09:48:35'),('B/100002/100037',100002,1163,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','01',5.00,2.81,14.05,0,'2023-05-31 11:25:49'),('B/100002/100038',100002,1164,'Southampton vs Bournemouth','EPL','2023-04-29 02:45:00','01','02',9.00,3.46,31.14,0,'2023-05-31 11:25:49'),('B/100002/100039',100002,1164,'Southampton vs Bournemouth','EPL','2023-04-29 02:45:00','01','03',19.00,3.25,61.75,0,'2023-04-21 11:24:54'),('B/100002/100040',100002,1168,'Everton vs Newcastle United','EPL','2023-04-30 04:45:00','01','01',20.00,5.17,103.4,0,'2023-03-24 13:36:31'),('B/100002/100041',100002,1167,'Southampton vs Bournemouth','EPL','2023-04-29 02:45:00','01','03',50.00,3.25,162.5,0,'2023-03-24 13:36:31'),('B/100002/100042',100002,1166,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','02',60.00,3.71,222.6,0,'2023-03-24 13:36:31'),('B/100002/100043',100002,1181,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','01',2.00,2.81,5.62,0,'2023-05-31 16:27:13'),('B/100002/100044',100002,1182,'Southampton vs Bournemouth','EPL','2023-04-29 02:45:00','01','02',6.00,3.46,20.76,0,'2023-05-31 16:27:13'),('B/100002/100045',100002,1183,'Everton vs Newcastle United','EPL','2023-04-30 04:45:00','01','03',6.00,1.74,10.44,0,'2023-05-31 16:27:13'),('B/100002/100046',100002,1184,'Tottenham Hotspur vs Manchester United','EPL','2023-04-28 03:15:00','01','03',3.00,2.49,7.47,0,'2023-05-31 16:29:06'),('B/100002/100047',100002,1185,'Southampton vs Bournemouth','EPL','2023-04-29 02:45:00','01','02',4.00,3.46,13.84,0,'2023-05-31 16:29:06'),('B/100002/100048',100002,1186,'Everton vs Newcastle United','EPL','2023-04-30 04:45:00','01','01',6.00,5.17,31.02,0,'2023-05-31 16:29:06');
/*!40000 ALTER TABLE `tb_bet_trx` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-06 14:20:14
