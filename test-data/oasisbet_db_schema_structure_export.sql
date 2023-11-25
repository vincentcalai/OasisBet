-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: oasisbet
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `tb_acc`
--

DROP TABLE IF EXISTS `tb_acc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_acc` (
  `acc_id` bigint NOT NULL AUTO_INCREMENT,
  `usr_id` bigint NOT NULL,
  `balance` double DEFAULT NULL,
  `deposit_limit` double DEFAULT NULL,
  `bet_limit` double DEFAULT NULL,
  PRIMARY KEY (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000021 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_bet_process_trx`
--

DROP TABLE IF EXISTS `tb_bet_process_trx`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_bet_process_trx` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `trx_id` varchar(20) NOT NULL,
  `ref_trx_id` varchar(20) DEFAULT NULL,
  `acc_id` bigint NOT NULL,
  `amount` double NOT NULL,
  `type` varchar(1) NOT NULL,
  `trx_dt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_bet_trx`
--

DROP TABLE IF EXISTS `tb_bet_trx`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_bet_trx` (
  `trx_id` varchar(20) NOT NULL,
  `acc_id` bigint NOT NULL,
  `event_id` bigint NOT NULL,
  `event_desc` varchar(100) NOT NULL,
  `comp_type` varchar(20) NOT NULL,
  `start_time` datetime NOT NULL,
  `bet_type` varchar(20) NOT NULL,
  `bet_selection` varchar(30) NOT NULL,
  `bet_amt` double NOT NULL,
  `odds` double NOT NULL,
  `potential_return` double NOT NULL,
  `is_settled` tinyint(1) NOT NULL,
  `trx_dt` datetime DEFAULT NULL,
  `settled_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`trx_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_other_trx`
--

DROP TABLE IF EXISTS `tb_other_trx`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_other_trx` (
  `acc_id` varchar(15) NOT NULL,
  `type` varchar(1) NOT NULL,
  `amount` double NOT NULL,
  `trx_dt` datetime DEFAULT NULL,
  `trx_id` varchar(20) NOT NULL,
  PRIMARY KEY (`trx_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_sequence`
--

DROP TABLE IF EXISTS `tb_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_sequence` (
  `seq_name` varchar(30) NOT NULL,
  `seq_value` bigint NOT NULL,
  PRIMARY KEY (`seq_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_usr`
--

DROP TABLE IF EXISTS `tb_usr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usr` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usr_nam` varchar(20) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_no` varchar(30) NOT NULL,
  `del_ind` varchar(1) NOT NULL,
  `created_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-19 12:46:01
