// app.js
const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 7072; // Puedes cambiar el puerto si es necesario
const productsFilePath = './data/products.json'; // Cambia la ruta si es necesario

const productManager = new ProductManager(productsFilePath);

app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getAllProducts();

    if (limit) {
      res.json(products.slice(0, parseInt(limit)));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
