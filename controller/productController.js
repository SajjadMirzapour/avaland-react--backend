const Product = require('../models/productModel');

async function getProducts(req, res) {
    try {
        const id = req.params?.id;
        if (id) await getProduct(req, res, id);
        else {
            let products = await Product.findAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
        }
    } catch (e) {
        console.log(e);
    }
}

async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

async function createProducts(req, res) {
    try {
        let products = await Product.findAll();
        let data = '';
        req.on('data', function (chunk) {
            data += chunk;
        })
        req.on('end', function () {
            data = JSON.parse(data);
            products.push({ id: products.length + 1, ...data })
        })
        res.setHeader('content-type', 'application/json');
        res.write(JSON.stringify({ message: 'added Successfully' }));
        return res.end();
    } catch (e) {
        console.log(e);
    }
}

async function updateProduct(req, res) {
    try {
        const id = req.params?.id;
        if (id) {
            result = await Product.findById(id)
            if (!result) {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Product Not Found' }))
            } else {
                let data = '';
                req.on('data', function (chunk) {
                    data += chunk;
                })
                let products = await Product.findAll();
                console.log('products0', products);
                req.on('end', function () {
                    data = JSON.parse(data);
                    products = products.map(product => product.id === id ? { ...product, ...data } : product)
                    res.setHeader(200, 'content-type', 'application/json');
                    res.write(JSON.stringify({ message: 'Updated successfuly' }));
                    return res.end();
                })
            }
        } else {
            res.setHeader(200, 'content-type', 'application/json');
            res.write(JSON.stringify({ message: 'insert id please' }));
        }
    } catch (e) {
        console.log(e);
    }
}



module.exports = {
    getProducts,
    createProducts,
    updateProduct
}