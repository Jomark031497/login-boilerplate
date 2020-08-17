const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./src/routes/UserRoute');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true},
     () => console.log('connected to database')
);

app.use('/users', userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server connected at port ${port}`));