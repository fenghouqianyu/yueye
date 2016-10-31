var express = require("express")
var fs = require("fs")
var router = express.Router()
router.get("/zheche",function (req,res,next) {
	fs.readFile("./data/login.json",function (err,data) {
		var arr = [1,2,3,4,5,6,7,8,9,0,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
		var json = JSON.parse(data.toString())
		var user = req.query
		var data = {
			code:0
		}
		for (var i = 0; i < json.length; i++) {
			if(json[i].name == user.name){
				data.code = 1;
				break;
			}
		}
		if(!data.code){
			data.test = ""
			for (var i = 0; i < 4; i++) {
				data.test += arr[Math.ceil(Math.random()*arr.length)]
			};
			fs.writeFile("./text/"+user.name+".txt",data.test)
		}
		res.jsonp(data)
	})
})
module.exports = router