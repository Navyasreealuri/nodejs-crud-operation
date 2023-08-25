const db = require('../models/products');

exports.createProduct = (req, res) => {
  const {
    name,
    description,
    price,
    category,
    stock_quantity,
    manufacturer,
    release_rate,
    rating,
    product_age
  } = req.body;

  db.createProduct(
    name,
    description,
    price,
    category,
    stock_quantity,
    manufacturer,
    release_rate,
    rating,
    product_age,
    (err, result) => {
      if (err) {
        console.error('Error creating product', err);
        res.status(500).send('Error creating product');
        return;
      }
      const insertedId = result.insertId;
      const insertedData = {
        id: insertedId,
        name,
        description,
        price,
        category,
        stock_quantity,
        manufacturer,
        release_rate,
        rating,
        product_age
      };
      res.status(201).json({
        message: 'Product created successfully',
        product: insertedData
      });
    }
  );
};

exports.getAllProducts = (req, res) => {
  db.getAllProducts((err, products) => {
    if (err) {
      console.error('Error getting products', err);
      res.status(500).send('Error getting products');
      return;
    }
    res.status(200).json(products);
  });
};

exports.getProductById = (req, res) => {
  const productId = parseInt(req.params.id);

  db.getProductById(productId, (err, product) => {
    if (err) {
      console.error('Error getting product', err);
      res.status(500).send('Error getting product');
      return;
    }
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }
    res.status(200).json(product);
  });
};

exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const {
    name,
    description,
    price,
    category,
    stock_quantity,
    manufacturer,
    rating
  } = req.body;

  db.updateProduct(
    productId,
    name,
    description,
    price,
    category,
    stock_quantity,
    manufacturer,
    rating,
    (err, result) => {
      if (err) {
        console.error('Error updating product', err);
        res.status(500).send('Error updating product');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send('Product not found');
        return;
      }
      res.status(200).send('Product updated successfully');
    }
  );
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;

  db.deleteProduct(productId, (err, result) => {
    if (err) {
      console.error('Error deleting product', err);
      res.status(500).send('Error deleting product');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Product not found');
      return;
    }
    res.status(200).send('Product deleted successfully');
  });
};
