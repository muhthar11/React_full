const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

const corsConfig = {
 origin: process.env.SITE_URL,
 credentials: true,
};


app.use(cors(corsConfig));

const dbConfig = require('./config/dbConfig')

app.use(express.json());
const userRoute = require('./routes/userRoute')
app.use('/api/user',userRoute)


const port = process.env.PORT || 8000;
app.listen(port,()=>console.log("node server started on port " + port))

