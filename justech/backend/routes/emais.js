const express = require("express")
const cors = require("cors")
const emails = express.Router()
emails.use(cors())

var EmailController = require("../controlleurs/EmailController");
emails.post("/email",EmailController.email);

module.exports = emails