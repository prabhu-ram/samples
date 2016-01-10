CREATE DATABASE IF NOT EXISTS `productmanagement` ;

USE `productmanagement` ;

DROP TABLE IF EXISTS `productmanagement`.`product` ;
DROP TABLE IF EXISTS `productmanagement`.`productcategory`;

-- -----------------------------------------------------
-- Table `productmanagement`.`productcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `productmanagement`.`productcategory` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) NOT NULL,
  `Details` varchar(400) DEFAULT NULL,
  `IsValid` tinyint(1) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `ModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `idx_productcategory_CreatedDate` (`CreatedDate`) 
)
ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `productmanagement`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `productmanagement`.`product` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ProductCategory_FK` int(11) DEFAULT NULL,
  `ProductCost` float NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Description` varchar(500),
  `CreatedDt` datetime NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `UpdatedDt` datetime DEFAULT NULL,
  `ProductPrice` float NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `FKC_Product_to_Productcategory_Idx` (`Id`, `ProductCategory_FK`),
  KEY `FKC_Product_to_Productcategory` (`ProductCategory_FK`), 
  CONSTRAINT `FKC_Product_to_ProductCategory`
    FOREIGN KEY (`ProductCategory_FK`)
    REFERENCES `productmanagement`.`productcategory` (`Id`)
)
ENGINE = InnoDB DEFAULT CHARSET=utf8;
