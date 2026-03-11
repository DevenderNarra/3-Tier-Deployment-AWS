require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./route");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);