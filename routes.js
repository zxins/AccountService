const apiRoutes = async (app) => {
    app.get('/', async (request, reply) => {
        return {hello: 'world'};
    });
}

module.exports = {
    apiRoutes
}