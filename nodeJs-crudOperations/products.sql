CREATE DATABASE IF NOT EXISTS test;
USE test;

CREATE TABLE IF NOT EXISTS newProductDetails (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  price INT,
  category VARCHAR(255),
  stock_quantity INT,
  manufacturer VARCHAR(255),
  release_rate DATE,
  rating INT,
  product_age INT
);
