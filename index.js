const http = require("http");
const routes = require("./routes.js");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const adminRouter = require("./routers/admin");
const shopRouter = require("./routers/shop");
const rootDir = require("./util/path");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});
app.listen(3000);