var express = require("express")
var fs = require("fs")
var router = express.Router()
router.get("/zheche2",function (req,res,next) {
	var user = req.query
	fs.readFile("./text/"+user.name+".txt",function (err,date) {
		var arr = [1,2,3,4,5,6,7,8,9,0,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
		var data = {
			code:0
		}
		if(date){
			var str = date.toString()
			if(user.text == str){
				data.code = 1
				data.password = ""
				for (var i = 0; i < 6; i++) {
					data.password += arr[Math.ceil(Math.random()*arr.length)]
				};
				fs.readFile("./data/login.json",function (err,date) {
					json = JSON.parse(date.toString())
					json.push({name:user.name,password:data.password})
					console.log(json)
					fs.writeFile("./data/login.json",JSON.stringify(json))
				})
			}else{
				data.code = 2
			}
		}
		console.log(data)
		res.jsonp(data)
	})
})
module.exports = router