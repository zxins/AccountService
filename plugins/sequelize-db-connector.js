const fp = require('fastify-plugin');
const Sequelize = require('sequelize');
const config = require('../config/config');

const newDB = () => {
    return new Sequelize(config['database']['write']['uri'], {
        // logging: (...msg) => global.log.debug(msg),
        timezone: config['timezone'],
        pool: {
            max: 30,
            idle: 30000
        }
    });
}

const dbPlugin = fp((fastify, opts, next) => {
    fastify.decorate('db', newDB());
    next();
});

module.exports = {
    newDB,
    dbPlugin
};