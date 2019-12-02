const { db } = require("./db.js");
const CalDate = require("./models/CalDate.js");
const Task = require("./models/Task.js");

CalDate.hasMany(Task);
Task.belongsTo(CalDate);

module.exports = { db, models: { CalDate, Task } };
