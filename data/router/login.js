var express = require("express")
var fs = require("fs")
var router = express.Router()
router.get("/login",function (req,res,next) {
	fs.readFile("./data/login.json",function (err,data) {
		var json = JSON.parse(data.toString())
		var user = req.query
		var data = {
			code:0
		}
		for (var i = 0; i < json.length; i++) {
			if(json[i].name == user.name){
				if(json[i].password == user.password){
					data.code = 1
					data.name = json[i].name
					break;
				}else{
					data.password = 1
					break;
				}
			}else{
				data.name = 1
			}
		};
		res.jsonp(data)
	})
})
module.exports = router