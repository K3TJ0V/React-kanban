const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");

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

app.post("/user/login", async (req, res) => {
  [login, password] = [req.body.login, req.body.password];

  const loginCheck = await client.query(
    "SELECT login, password FROM test WHERE login = $1",
    [login]
  );
  if(loginCheck.rows.length === 1){
    bcrypt.compare(password, loginCheck.rows[0].password).then((result)=>{
      if(result){
        res.status(200).send({message: "succesfully logged in", user: loginCheck.rows[0]})
      }else{
        res.status(400).send({error: "wrong password"})
        return
      }
    })
  }else{
    res.status(400).send({error: "wrong login"})
  }
});

app.post("/user/create", async (req, res) => {
  [login, password] = [req.body.login, req.body.password];

  const loginCheck = await client.query(
    "SELECT login, password FROM test WHERE login = $1",
    [login]
  );

  if (loginCheck.rows.length !== 1) {
    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.log(err);
          return;
        }
        await client.query("INSERT INTO test(login, password) VALUES($1, $2)", [
          login,
          hash
        ]);
      });
    });
    res.status(201).send({ message: "user created" });
  } else {
    res.status(401).send({ error: "login already exists" });
  }
});

app.listen(6050, null, () => {
  console.log("Server started");
});
