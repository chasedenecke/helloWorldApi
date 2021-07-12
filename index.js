const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const swaggerTools = require('swagger-tools');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerDoc = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, './swagger.yml'), 'utf8'));

const app = express();

app.use(cors({ origin: '*' }));
app.use(morgan('tiny'));
swaggerTools.initializeMiddleware(swaggerDoc, middleware => {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(
    middleware.swaggerUi({
      apiDocs: '/v1/api-docs',
      swaggerUi: '/v1/docs'
    })
  );
  app.use(
    middleware.swaggerRouter({
      controllers: path.join(__dirname, 'controllers'),
      useStubs: true
    })
  );

  app.use((err, req, res, next) => {
    console.log(err);

    if (err.status) {
      res.status(err.status).json(err);
    }
    next(err);
  });

  app.use((req, res, next) => {
    console.log('req is 404', req);
    res.status(404).json({
      code: 404,
      message: 'Not Found'
    });
  });
});

// this is it!
module.exports.handler = serverless(app);
