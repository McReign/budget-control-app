const app = require('./app');
const config = require('./config');

app.listen(config.port, config.host, () => {
    console.log(`App is running on ${config.host}:${config.port}`);
});