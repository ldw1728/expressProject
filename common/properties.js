const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config/conf.properties');


exports.getPort = () => {
    let port = properties.get('server.port');
    return port;
}