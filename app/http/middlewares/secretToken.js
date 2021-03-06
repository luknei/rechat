var config = require('../../config');

module.exports = function *secretToken(next) {
    var secret = this.request.headers["x-token"];

    if (!secret || secret !== config.secret) {
        this.response.type = 'application/json';
        this.response.status = 403;
        this.response.body = {
            message: 'You are not authorized to access this route!'
        };

        return;
    }

    this.response.body = this.request.headers;

    yield next;
};