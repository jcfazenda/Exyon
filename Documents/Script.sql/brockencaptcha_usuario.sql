CREATE DATABASE  IF NOT EXISTS `brockencaptcha` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `brockencaptcha`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: brockencaptcha
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuario` (
  `idUsuario` bigint(9) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(45) DEFAULT NULL,
  `SobreNome` varchar(45) DEFAULT NULL,
  `Cpf` varchar(20) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Senha` varchar(45) DEFAULT NULL,
  `Avatar` varchar(200) DEFAULT NULL,
  `Canvas` varchar(200) DEFAULT NULL,
  `Ativo` tinyint(1) DEFAULT NULL,
  `Telefone` varchar(45) DEFAULT NULL,
  `idUsuarioAdministrador` bigint(9) DEFAULT NULL,
  `idTipo` bigint(9) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Julio Cesar','Fazenda','090.516.837-06','julio.fazenda@e-xyon.com.br','123456','avatar_44.jpg','...',1,'(21) 9 9931-6964',1,1),(2,'Carlos','Ligeiro','000.000.00-00','carlos.ligeiro@e-xyon.com.br','123456','profile-default.png','...',1,'(00) 0 0000-0000',1,2),(3,'Monteiro','Lobato','090.516.837-06','monteiro.lobato@gmail.com','123456','profile-default.png',NULL,1,'(00) 0 0000-0000',1,2),(11,'Janaina ','dos Santos Rocha','000.000.000-00','janaina.rocha@e-xyon.com.br','333555','profile-default.png',NULL,1,'(00) 0 0000-0000',1,2),(12,'Breno','Oliveira','080.516.837-06','breno@gmail.com','123456','profile-default.png',NULL,1,'(21) 9 9931-6964',1,2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-03 22:16:44
