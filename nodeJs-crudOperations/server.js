const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.use('/products', require('./routes/products'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
