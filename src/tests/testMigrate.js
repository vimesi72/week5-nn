require("../models");
const sequelize = require("../utils/connection");

const testMigrate = async () => {
  try {
    await sequelize.sync({ forece: true });
    console.log("DB reset ✅");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

testMigrate();
