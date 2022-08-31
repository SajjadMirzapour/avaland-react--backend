
function validate(req, res, next) {
    console.log('valid1');
    next(undefined);
    console.log('valid2');
    // setTimeout(()=>{
    //     next(new Error('Validation Failed!'));
    // },3000);
}

module.exports = validate;
