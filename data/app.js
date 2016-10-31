var express = require("express")
var app = express()
var config = require("./config/config.js")(app)
var server = app.listen(3030,function () {
	console.log("启动 3030")
})