// require('dotenv').config();

const express = require('express');
const cors=require("cors");
const app = express();
const errorMiddleware = require('./middlewares/error-middleware');
const authRoute = require('./router/auth-router'); 
const contactRoute=require("./router/contact-router");
const serviceRoute=require("./router/service-router");
const adminRoute=require('./router/admin-router');
const connectDb = require('./utils/db'); 
const port = 5005;


const corOptions={
  origin:"http://localhost:5173",
  methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
  Credential:true,
};
app.use(cors(corOptions));



app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/form',contactRoute);
app.use('/api/data',serviceRoute);

//admin
app.use('/api/admin',adminRoute);



app.use(errorMiddleware);



connectDb().then(() => {
  app.listen(port, () => { 
    console.log(`Example app listening on port ${port}`);
  });
}).catch(error => {
  console.error('Database connection failed', error);
});
