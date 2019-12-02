const Sequelize = require("sequelize");
const PG = process.env.DATABASE_URL || "postgres://localhost:5432/mjpfp";

const db = new Sequelize(PG, { logging: false });

module.exports = { db };
