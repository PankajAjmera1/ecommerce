import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from './swagger/swaggerDef.js';
import { authSwagger } from './swagger/authSwagger.js';
import { productSwagger } from './swagger/productSwagger.js';
import { collectionSwagger } from './swagger/collection.Swagger.js';

const options = {
  swaggerDefinition,
  apis: [],
};

const specs = swaggerJsdoc(options);

// Manually add paths for the routes
specs.paths = {
  ...authSwagger,
  ...productSwagger,
  ...collectionSwagger,
};

export { swaggerUi, specs };
