DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  ItemId INT NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(45) NULL,
  Price VARCHAR(45) NULL,
  StockQuantity INTEGER(10) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ("iphone", "ELECTRONICS", "999","50");
VALUES("Car Chargers", "ELECTRONICS", "20", "100");
VALUES("USB Chord", "ELECTRONICS", "10", "100");
VALUES("Loaf of Bread", "FOOD", "50", "5");
VALUES("Milk", "FOOD", "4", "150");
VALUES("Red T Shirt", "CLOTHING", "3", "100");
VALUES("Blue Jean Pants", "CLOTHING", "10", "100");
VALUES("Baseball Cap", "CLOTHING", "30", "100");
VALUES("Sneakers", "CLOTHING", "50", "100");
VALUES("Harry Potter Book 1", "BOOKS", "30", "100");

SELECT * FROM products;
