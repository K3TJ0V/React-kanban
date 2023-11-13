const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const cors = require('cors');

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {

    let origin = req.header("origin");
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "180");

    if(req.method === 'OPTION') {
        let requestedAllowHeaders = req.Header("Access-Control-Request-Headers");
        res.setHeader("Access-Control-Allow-Headers", requestedAllowHeaders);
        res.status(200);
        res.end();
        return;
    }

    next();
});

app.post('/', (req, res)=>{
    console.log('ktos sie dobija');
})


app.listen(6050, null, () => {
    console.log("Server started");
  });
  