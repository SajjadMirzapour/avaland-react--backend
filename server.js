const http = require('http');
const { getProducts, createProducts, updateProduct } = require('./controller/productController');
const { fetchQueryStringFromURL, validate, sampleMiddleware, checkContent_type } = require('./middlewares');

const RouterClass = require('./Router');
const Router = new RouterClass();

Router.addRoute('/sampleGET', getProducts, 'get').middleware([fetchQueryStringFromURL, validate, sampleMiddleware, checkContent_type]);
// Router.addRoute('/samplePOST', getProducts, 'post').middleware(fetchQueryStringFromURL);
Router.addRoute('/createProducts', createProducts, 'post');
Router.addRoute('/updateProduct', updateProduct, 'put').middleware([fetchQueryStringFromURL])

const server = http.createServer((req, res) => {
    Router.route(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server lintening on ${PORT}`);
});
