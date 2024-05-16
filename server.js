// Imports
const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');


const agencyRouter = require('./Routers/AgencyRouter');
const clientRouter = require('./Routers/ClientRouter');


env.config();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

connectDB();



app.use('/agency', agencyRouter);
app.use('/client', clientRouter);

// Server port
app.listen(process.env.PORT, (() => {
  console.log(`Server connected with port : ${process.env.PORT}`);
}));