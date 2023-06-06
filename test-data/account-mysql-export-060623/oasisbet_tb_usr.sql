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
-- Table structure for table `tb_usr`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usr_nam` varchar(20) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_no` varchar(30) NOT NULL,
  `del_ind` varchar(1) NOT NULL,
  `created_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usr_nam_UNIQUE` (`usr_nam`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usr`
--

/*!40000 ALTER TABLE `tb_usr` DISABLE KEYS */;
INSERT INTO `tb_usr` VALUES (3,'CHOONANN','$2a$10$2FS6yavZ6VT21YXrbB8ItOZjGHW0hrgAlNXK8R3mwCUfBRehWwXNu','test@test.com','91234567','N','2023-05-25 14:49:00'),(4,'ADMIN','$2a$10$p3tOmq.ECrmqzwyQCS4C/e9nQn5isB5Vkoy6ZLtmZDvVePCM4GSeG','test@test.com','98881111','N','2023-05-25 14:53:07'),(5,'TESTUSER','$2a$10$uG9OPDf/2DaSxn90IJa/euValLX8A4lfQsDxRbT5hvJU/KVtOoeEq','test@test.com','11112222','N','2023-05-25 15:29:36'),(6,'TESTUSERA','$2a$10$DMjNSrMCEd.4krYEkjCqyOuSsgl0bxHhMUeuDR2SVXSbVCvrNQRZa','test@test.com','12355677','N','2023-05-25 15:33:52');
/*!40000 ALTER TABLE `tb_usr` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-06 14:20:13
