const express = require('express');
const connectDb = require("./config/db");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { receiptRoutes } = require('./routes/index');
var cors = require('cors');

const app = express();
connectDb();

app.use(express.json());
app.use(cors());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'ContentStack Automated Toll Plaza REST API',
            description: "A REST API built with Express and MongoDB. This API provides functionality to generate toll receipts, validate return toll receipts & to check all the previously generated toll receipts."
        },
    },
    apis: ["./routes/receiptRoutes.js"]
}

app.use('/v1/tollplaza',receiptRoutes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(process.env.PORT || 5000, () => console.log('Up and running 🚀'));