var express = require("express")
var fs = require("fs")
var router = express.Router()
router.get("/getindexdata",function (req,res,next) {
	fs.readFile("./data/index.json",function (err,data) {
		res.jsonp(JSON.parse(data.toString()))
	})
})
module.exports = router