const createService = require('feathers-sequelize');
const createModel = require('./model');
const hooks = require('./hooks');
const filters = require('./filters');
const middleware = require('./middleware');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'facebookAccounts',
    Model,
    paginate
  };

  app.configure(middleware);

  // Initialize our service with any options it requires
  app.use('/facebookAccounts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('facebookAccounts');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
