const express = require('express');
const {router}  = require('./Routes/indexRoute')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const {dbConnect} = require('./Helpers/dbconnection')

dbConnect();

app.use(express.json());

app.use("/",router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(5500,()=>{
    console.log("server is running on 5500");
    
})
