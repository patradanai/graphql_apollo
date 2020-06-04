const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("MT700PDDB", "sa", "qwerty@1", {
  host: "172.16.73.146",
  port: "1433", // <----------------The port number you copied
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    options: {
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  },
});

const models = {
  List: sequelize.import("./list.js"),
};

module.exports = {
  sequelize,
  models,
};
