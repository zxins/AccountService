const buildApp = require('./buildApp')
const {apiRoutes} = require('./routes')
const {dbPlugin} = require('./plugins/sequelize-db-connector')

// order to register / load
// 1. plugins (from the Fastify ecosystem)
// 2. your plugins (your custom plugins)
// 3. decorators
// 4. hooks and middlewares
// 5. your services
const app = buildApp()

// plugins
app.register(dbPlugin, {});
app.register(apiRoutes, {prefix: 'v1'})

// decorators
app.decorateRequest('app', app);

// middlewares
// ...

// services
app.listen(5555, '127.0.0.1', (err) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    // app.log.info(`server listening on ${address}`);
})