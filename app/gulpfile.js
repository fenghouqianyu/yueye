//服务器
	var gulp=require("gulp")
	var fs=require("fs")
	var connect=require("gulp-connect")//启动服务器
	var respond=require("gulp-respond")//请求响应模块
//压缩js
	var uglify = require("gulp-uglify")//js压缩模块
	var concat = require("gulp-concat")//文件合并模块
	var ngAnnotate = require("gulp-ng-annotate")//angular标准化模块
	var ngmin = require("gulp-ngmin")//angular压缩模块
//清空
	var clean = require("gulp-clean")//文件清理模块
//压缩html
	var minifyHtml = require("gulp-minify-html")//html压缩模块
	var rename = require("gulp-rename")//重命名模块










//html压缩+加密
	gulp.task("watchHtml",function (argument) {
		gulp.watch(["./src/html/*.html"],["miniHtml"])
	})

	gulp.task("cleanHtml",function (argument) {
		return gulp.src(["./src/html/min"])
			.pipe(clean())
	})
	gulp.task("miniHtml",["cleanHtml"],function (argument) {
		return gulp.src("./src/html/*.html")
			.pipe(minifyHtml())
			.pipe(rename(function (path) {
				path.basename =  path.basename+".min"
			}))
			.pipe(gulp.dest("./src/html/min"))
	})
//index压缩
	gulp.task("watchIndex",function (argument) {
		gulp.watch(["./src/index.html"],["miniIndex"])
	})
	gulp.task("cleanIndex",function (argument) {
		return gulp.src(["./src/min"])
			.pipe(clean())
	})
	gulp.task("miniIndex",["cleanIndex"],function (argument) {
		return gulp.src("./src/index.html")
			.pipe(minifyHtml())
			.pipe(rename(function (path) {
				path.basename =  path.basename+".min"
			}))
			.pipe(gulp.dest("./src/min"))
	})
//js压缩+加密
	gulp.task("watchJs",function (argument) {
		gulp.watch(["./src/js/*.js"],["build"])
	})
	gulp.task("cleanJs",function (argument) {
		return gulp.src(["./src/js/min"])
			.pipe(clean())
	})
	gulp.task("build",["cleanJs"],function () {
		return gulp.src(["./src/js/app.js","./src/js/controller.js","./src/js/config.js"])
			.pipe(ngAnnotate())
			.pipe(ngmin())
			.pipe(uglify())
			.pipe(concat("all.min.js"))
			.pipe(gulp.dest("./src/js/min/"))
	})
//启动服务器
	gulp.task("connect",function () {
		connect.server({
			root:["./src"],
			port:8080,
			livereload:true,
			middleware:function(){
				return[function(req,res,next){
					next()
				},function(req,res){
					var path=req.url.split("?").shift();
					if(path == "/"){
						path = "/src/min/index.min.html"
					}else{
						path = "/src" + path
					}
					url = "." + path
					gulp.src(url)
						.pipe(respond(res))
				}]
			}
		})
	})
//启动项目
	gulp.task("default",["build","miniHtml","miniIndex","connect","watchJs","watchIndex","watchHtml"])