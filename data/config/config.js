var getindexdata = require("../router/getindexdata.js")
var login = require("../router/login.js")
var zheche = require("../router/zheche.js")
var zheche2 = require("../router/zheche2.js")
module.exports = function (app) {
	app.get("/zheche2",zheche2)
	app.get("/zheche",zheche)
	app.get("/login",login)
	app.get("/getindexdata",getindexdata)
}