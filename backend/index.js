const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const cors = require('cors');

const app = express();

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

class column {
    constructor(id, tittle, taskList){
        this.id = id,
        this.tittle = tittle,
        this.taskList = taskList
    }
}

let kolumny = [];

app.post('/column/add', (req, res)=>{
    console.log('dodano kolumne');
    const newColumn = new column(req.body.id, req.body.tittle, req.body.taskList)
    kolumny.push(newColumn);
    console.log(kolumny);
    res.status(201);
    res.json(newColumn);
    res.send();
})

app.listen(6050, null, () => {
    console.log("Server started");
  });
  