CREATE DATABASE url_shortener;
USE url_shortener;

--- Create table
CREATE TABLE `short_url` (
  `id` int NOT NULL AUTO_INCREMENT,
  `long_url` text NOT NULL,
  `short_url` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
)
