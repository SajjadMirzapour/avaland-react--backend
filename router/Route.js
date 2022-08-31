const { checkUrlSlash } = require('./helper');

class Route {
  constructor(url, handler, method) {
    this.url = checkUrlSlash(url);
    this.handler = handler;
    this.method = method;
    this.middlewares = [];
  }

  middleware(middleware) {
    if (Array.isArray(middleware))
      middleware.forEach(mid => this.middlewares.push(mid));
    else
      this.middlewares.push(middleware);
    // this.middlewares.push(Array.isArray(middleware) ? ...middleware : middleware)
    // console.log('this', this);
    return this;
  }
}

module.exports = Route;