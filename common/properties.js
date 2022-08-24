const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config/conf.properties');

exports.getPort = () => {
    let port = properties.get('server.port');
    return port;
}

exports.getEnv = () => {
    let env = properties.get('env.NODE_ENV');
    return env;
}

exports.getValue = (key) =>{
    let value = properties.get(key);
    return value;
}