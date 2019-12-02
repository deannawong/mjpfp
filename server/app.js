const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());

const { models } = require("./db/index.js");

const { CalDate, Task } = models;

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/api/dates/:year/:month", (req, res, next) => {
  CalDate.findAll({
    where: {
      year: req.params.year,
      month: req.params.month
    }
  }).then(results => {
    res.send(results);
  });
});

app.get("/api/dates", (req, res, next) => {
  CalDate.findAll().then(results => {
    res.send(results);
  });
});

app.get("/api/tasks/:id", (req, res, next) => {
  Task.findAll({
    where: {
      calDateId: req.params.id
    }
  }).then(response => {
    if (response === null) {
      res.send("no tasks found");
    } else {
      res.send(response);
    }
  });
});

app.post("/api/tasks", (req, res, next) => {
  Task.create(req.body).then(() =>
    Task.findAll({
      where: {
        calDateId: req.body.calDateId,
        description: req.body.description
      }
    }).then(response => {
      res.send(response);
    })
  );
});
app.delete("/api/tasks/:id", (req, res, next) => {
  // console.log(req.params.id);
  Task.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.sendStatus(200));
});
app.put("/api/tasks/:id", (req, res, next) => {
  console.log(req.body);
});
module.exports = { app };
