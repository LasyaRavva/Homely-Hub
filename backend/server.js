const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_LOCAL;
const port = process.env.PORT || 8000;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
  });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
