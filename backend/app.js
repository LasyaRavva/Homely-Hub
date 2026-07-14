const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");

const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/v1/rent/listing", propertyRoutes);
app.use("/api/v1/rent/user", userRoutes);

const frontendBuildPath = path.join(__dirname, "../frontend/build");
const frontendIndexPath = path.join(frontendBuildPath, "index.html");

if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }

    if (fs.existsSync(frontendIndexPath)) {
      return res.sendFile(frontendIndexPath);
    }

    return next();
  });
}

module.exports = app;
