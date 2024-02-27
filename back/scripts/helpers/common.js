const fs = require('fs');
const dataPath = 'front/src/assets/products.json';

// Get Product By Id
function getProduct(id) {
    const products = getAllProducts();
    const data = products.data
    return data.find(product => product.id === id)
}

// Get All Products
function getAllProducts() {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
}

// Delete Product
function deleteProduct(id) {
    let products = getAllProducts();
    let data = products.data;
    data  = data.filter(product => product.id !== id);
    let content = { data: data };
    fs.writeFile(dataPath, JSON.stringify(content, null, 2), (err) => {
        if (err) {
          console.error(`Error writing file ${dataPath}:`, err);
          return;
        }
      });
    return data;
}

// Edit Product
function editProduct(id, updatedProduct) {
    let products = getAllProducts();
    let data = products.data;
    data = data.map(product => {
        if (product.id === id) {
            return { ...product, ...updatedProduct };
        }
        return product;
    });

    let content = { data: data };
    fs.writeFile(dataPath, JSON.stringify(content, null, 2), (err) => {
        if (err) {
          console.error(`Error writing file ${dataPath}:`, err);
          return;
        }
      });
    return products.data.find(product => product.id === id);
}

// Create Product
function createProduct(product, productsDb) {
    productDb = productsDb.data.push(product);
    productDb = productsDb.data.sort((a, b) => a.id - b.id);
    let content = { data: productDb }
    fs.writeFile(dataPath, JSON.stringify(content, null, 2), (err) => {
        if (err) {
          console.error(`Error writing file ${dataPath}:`, err);
          return;
        }
      });
}

module.exports = {
    createProduct : createProduct,
    editProduct : editProduct,
    deleteProduct : deleteProduct,
    getAllProducts : getAllProducts,
    getProduct : getProduct
}