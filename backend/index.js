const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
const client = new Client({
  database: "mydb",
  user: "root",
  password: "root",
  port: 5432,
});

client.connect();

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

  if (req.method === "OPTION") {
    let requestedAllowHeaders = req.Header("Access-Control-Request-Headers");
    res.setHeader("Access-Control-Allow-Headers", requestedAllowHeaders);
    res.status(200);
    res.end();
    return;
  }

  next();
});

app.post("/user/create", async (req,res) =>{

})

app.post("/user/create", async (req, res) => {
  [login, password] = [req.body.login, req.body.password];
  const query = await client.query(
    "INSERT INTO test(login, password) VALUES($1, $2)",
    [login, password]
  );
  res.status(200);
  res.send('dodano noba')
});

app.listen(6050, null, () => {
  console.log("Server started");
});
