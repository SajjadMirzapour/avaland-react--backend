const formidable = require('formidable')

const form = formidable({ multiples: true });

async function getForm(req, res, next) {
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
            res.end(String(err));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify({ fields, files }, null, 2));
        return req
    });

    return;
}

module.exports = getForm