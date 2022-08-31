function checkContent_type(req, res, next) {
    const type = req.rawHeaders[17].split(',');
    console.log('check1');
    if (type.includes('queryString')) {
        console.log('queryString');
    }
    else if (type.includes('text/html')) {
        console.log('hiii');
    }
    else console.log('bye');
    console.log('check2');
    next(undefined)
}

module.exports = checkContent_type