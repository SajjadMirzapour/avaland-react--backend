const formidable = require('formidable')
const path = require('path')
var fs = require('fs');

async function getForm(req, res, next) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        console.log('fields', fields);
        console.log('files', files);

        // try {

        //     if (!files.file.filepath) throw new Error

        //     else {
        var oldPath = files.file.filepath;
        var newPath = path.join(__dirname, '..', 'uploads')
            + '/' + files.file.originalFilename

        var rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err)
            return res.writeHead(200, { 'Content-Type': 'application/json' }),
                res.end(JSON.stringify({ message: 'Successfully uploaded' }));
        })
    }
        // } catch (e) {
        // console.log(e);
        // return res.writeHead(400, { 'Content-Type': 'application/json' }),
        //     res.end(JSON.stringify({ message: 'wrong format' }));
        // }
        // }    
    )

};

module.exports = getForm