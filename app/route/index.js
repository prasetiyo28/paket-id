const PackageRouter = require('./package');

module.exports = function (app) {
  app.use('/package', PackageRouter);
//   app.use(notFound);
};
