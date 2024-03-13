const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
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
    "SELECT id, login, password, next_column_id, next_task_id FROM users JOIN next_ids ON next_ids.user_id = users.id WHERE login = $1;",
    [login]
  );
  if (loginCheck.rows.length === 1) {
    bcrypt
      .compare(password, loginCheck.rows[0].password)
      .then(async (result) => {
        if (result) {
          const columns = await client.query(
            "SELECT columns.id as colID, * FROM columns LEFT JOIN tasks ON tasks.column_id = columns.id WHERE columns.user_id = $1 ORDER BY columns.id;",
            [loginCheck.rows[0].id]
          );
          res.status(200).send({
            message: "succesfully logged in",
            user: loginCheck.rows[0],
            columnData: columns.rows,
          });
        } else {
          res.status(400).send({ error: "wrong password" });
          return;
        }
      });
  } else {
    res.status(400).send({ error: "wrong login" });
  }
});

app.post("/user/create", async (req, res) => {
  [login, password] = [req.body.login, req.body.password];

  const loginCheck = await client.query(
    "SELECT login, password FROM users WHERE login = $1",
    [login]
  );

  if (loginCheck.rows.length !== 1) {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        console.log(err);
        return;
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.log(err);
          return;
        }
        await client.query(
          "INSERT INTO users(login, password) VALUES($1, $2)",
          [login, hash]
        );
        const newUserID = await client.query(
          "SELECT id FROM users WHERE login = $1",
          [login]
        );
        await client.query("INSERT INTO next_ids VALUES($1,1,1)", [
          newUserID.rows[0].id,
        ]);
      });
    });
    res.status(201).send({ message: "user created" });
  } else {
    res.status(401).send({ error: "login already exists" });
  }
});

app.post("/column/add", async (req, res) => {
  [id, userID, tittle] = [req.body.id, req.body.userID, req.body.tittle];
  try {
    await client.query("INSERT INTO columns VALUES($1,$2,$3)", [
      id,
      tittle,
      userID,
    ]);
    await client.query(
      "UPDATE next_ids SET next_column_id = $1 WHERE user_id = $2",
      [id + 1, userID]
    );
  } catch {
    res
      .status(400)
      .send({ error: "couldn't add this column, action not saved" });
  }
  res.status(201);
});

app.post("/column/delete", async (req, res) => {
  [colID] = [req.body.id];
  try {
    await client.query("DELETE FROM columns WHERE id = $1", [colID]);
  } catch {
    res
      .status(400)
      .send({ error: "couldn't delete this column, action not saved" });
  }
  res.status(201);
});

app.post("/task/add", async (req, res) => {
  [id, desc, shortDesc, column_id, userID] = [
    req.body.id,
    req.body.description,
    req.body.shortDescription,
    req.body.column_id,
    req.body.userID,
  ];
  try {
    await client.query("INSERT INTO tasks VALUES($1,$2,$3,$4)", [id,desc,shortDesc,column_id]);
    await client.query("UPDATE next_ids SET next_task_id = $1 WHERE user_id = $2", [id+1,userID]);
  } catch {
    res.status(400).send({ error: "couldn't add this task, action not saved" });
  }

  res.status(201).send({ message: "task added succesfully" });
});
app.post("/task/delete", async (req, res) => {
  [taskID] = [req.body.id]
  try{
    await client.query("DELETE FROM tasks WHERE id = $1", [taskID])
  }catch{
    res.status(400).send({error: "couldn't delete task, action not saved"})
  }
  res.status(201).send({ message: "task deleted succesfully" });
});
app.post("/task/move", async (req, res) => {
  [taskID, targetColumnID] = [req.body.taskID, req.body.column_id]
  try{
    await client.query("UPDATE tasks SET column_id = $1 WHERE id = $2", [targetColumnID, taskID])
  }catch{
    res.status(400).send({error: "couldn't move task, action not saved"})
  }
  res.status(201).send({message: "succesfully moved task"})
});


app.post("/task/desc/edit", async (req, res) => {
  [id, desc] = [req.body.taskID, req.body.desc];
  try{
    await client.query("UPDATE tasks SET description = $1 WHERE id = $2", [desc, id])
  }catch{
    res.status(401).send({error: "couldn't update description, action not saved"});
  }
  res.status(201).send({message: "succesfully changed description"})
});


app.post("/task/shortDesc/edit", async (req, res) => {
  [id, shortDesc] = [req.body.taskID, req.body.shortDesc];
  console.log(id, shortDesc);
  try{
    await client.query("UPDATE tasks SET short_description = $1 WHERE id = $2", [shortDesc, id])
  }catch{
    res.status(401).send({error: "couldn't update short description, action not saved"});
  }


  res.status(201).send({message: "succesfully changed short descriotpion"})
});

app.listen(6050, null, () => {
  console.log("Server started");
});
