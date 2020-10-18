const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.join(__dirname, 'production.env'),
});

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';

const DOMAIN = process.env.DOMAIN || `http://${HOST}${PORT !== 80 ? ':' + PORT : ''}`;

module.exports = {
  port: PORT,
  host: HOST,
  domain: DOMAIN,
  mongodb: {
    uri: ((process.env.NODE_ENV === 'production') && process.env.MONGODB_URI)
        || 'mongodb://localhost/budget-control-app',
  },
  crypto: {
    iterations: ((process.env.NODE_ENV === 'production') && 12000) || 1,
    length: 128,
    digest: 'sha512',
  },
};
