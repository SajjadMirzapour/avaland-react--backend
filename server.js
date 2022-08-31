const http = require('http');
const { fetchQueryStringFromURL, validate, sampleMiddleware, checkContent_type } = require('./middlewares');

const RouterClass = require('./Router');
const Router = new RouterClass();


const server = http.createServer((req, res) => {
    Router.route(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server lintening on ${PORT}`);
});
