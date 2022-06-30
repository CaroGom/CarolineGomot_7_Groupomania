const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");

require("./config/db");

const { checkUser, requireAuth } = require("./middlewares/authmiddleware");

//setting up routes

const UserRoutes = require("./routes/userroute");
const PostRoutes = require("./routes/postroute");

const app = express();

app.use(cors());

//setting up POST routes

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("hello"));

//img management
app.use("/images", express.static(path.join(__dirname, "images")));

//calling routes
app.use("/api/auth", UserRoutes);
app.use("/api/post", PostRoutes);

module.exports = app;