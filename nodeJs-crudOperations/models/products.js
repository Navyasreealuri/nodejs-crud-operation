const config = require('../config/config');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
    return;
  }
  console.log('Connected to the database');
});

exports.createProduct = (
  name,
  description,
  price,
  category,
  stock_quantity,
  manufacturer,
  release_rate,
  rating,
  product_age,
  callback
) => {
  const sql =
    'INSERT INTO newProductDetails (name, description, price, category, stock_quantity, manufacturer, release_rate, rating, product_age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    name,
    description,
    price,
    category,
    stock_quantity,
    manufacturer,
    release_rate,
    rating,
    product_age
  ];

  db.query(sql, values, callback);
};

exports.getAllProducts = (callback) => {
  db.query('SELECT * FROM newProductDetails', callback);
};

exports.getProductById = (productId, callback) => {
  db.query(
    'SELECT * FROM newProductDetails WHERE id = ?',
    productId,
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result[0]);
    }
  );
};

exports.updateProduct = (
  productId,
  name,
  description,
  price,
  category,
  stock_quantity,
  manufacturer,
  rating,
  callback
) => {
  const sql =
    'UPDATE newProductDetails SET name = ?, description = ?, price = ?, category = ?, stock_quantity = ?, manufacturer = ?, rating = ? WHERE id = ?';
  const values = [
    name,
    description,
    price,
    category,
    stock_quantity,
    manufacturer,
    rating,
    productId
  ];

  db.query(sql, values, callback);
};

exports.deleteProduct = (productId, callback) => {
  db.query('DELETE FROM newProductDetails WHERE id = ?', productId, callback);
};
