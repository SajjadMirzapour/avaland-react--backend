function sampleMiddleware(req, res, next) {
   console.log('sample');
   next(undefined);
}

module.exports = sampleMiddleware;