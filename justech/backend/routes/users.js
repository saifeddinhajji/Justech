const express = require("express")
const cors = require("cors")
const users = express.Router()
users.use(cors())

var AuthController = require("../controlleurs/AuthController");
users.post("/register", AuthController.register);
users.post("/login",AuthController.login);
users.get("/profile",AuthController.profile);

module.exports = users