/*
 * Primary file for API
 *
*/

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
let port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())


require('./lib/routs')(app);

app.listen(port,()=>{
    console.log("Express is started and running in the port " +port);
});