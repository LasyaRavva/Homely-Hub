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

app.use((req, res, next) => {
  const originalCookie = res.cookie.bind(res);

  res.cookie = (name, value, options = {}) => {
    if (name === "jwt" && process.env.NODE_ENV === "production") {
      return originalCookie(name, value, {
        ...options,
        sameSite: "none",
        secure: true,
      });
    }

    return originalCookie(name, value, options);
  };

  next();
});

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const frontendOrigin =
    process.env.FRONTEND_URL || "https://homelyhub-chi.vercel.app";

  const isAllowedOrigin =
    origin &&
    (origin === process.env.FRONTEND_URL ||
      origin === frontendOrigin ||
      origin === "http://localhost:3000" ||
      origin === "http://127.0.0.1:3000");

  if (isAllowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Vary", "Origin");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

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
