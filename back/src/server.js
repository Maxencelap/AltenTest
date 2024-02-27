const express = require('express');
const common = require('../scripts/helpers/common.js');
const app = express();

app.use(express.json());

// GET PRODUCTS
app.get('/products', (req, res) => {
    try {
        const products = common.getAllProducts();
        res.status(200).json(products); // 200 OK
    } catch (e) {
        console.error('Error fetching products:', e);
        res.status(500).json({ error: 'Internal server error' }); 
    }
});

// GET PRODUCT
app.get('/products/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = common.getProduct(id);
        res.status(200).json(product); // 200 OK
    } catch (e) {
        console.error('Error fetching product:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST PRODUCT
app.post('/products', async (req, res) => {
    try {
        const product = req.body;
        const productsDb =  common.getAllProducts();
        common.createProduct(product, productsDb);
        res.status(201).json(productsDb); // 201 Created
    } catch (e) {
        console.error('Error creating product:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE PRODUCT
app.delete('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedProduct = common.deleteProduct(id);
        if (deletedProduct) {
            res.status(200).json({ message: 'Product deleted successfully' }); // 200 OK
        } else {
            res.status(404).json({ error: 'Product not found' }); // 404 Not Found
        }
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// PATCH PRODUCT
app.patch('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedProduct = req.body;
        const result = common.editProduct(id, updatedProduct);
        if (result) {
            res.status(200).json(result); // 200 OK
        } else {
            res.status(404).json({ error: 'Product not found' }); // 404 Not Found
        }
    } catch (e) {
        console.error('Error updating product:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log('App is running')
});

