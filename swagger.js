const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
      title: 'Employee management',
      description: 'Description'
    },
    host: 'localhost:5500'
    
  };
  
  const outputFile = './swagger-output.json';
  const routes = ['Routes/indexRoute.js' ];
  
  
  swaggerAutogen()(outputFile, routes, doc);