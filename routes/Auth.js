var express=require("express");
var router=express.Router();
var passport=require("passport"),
	middleWare=require("../middleware/func");





//AUTH OPERATIONSS
router.get("/",middleWare.isLogged,function(req,res){
	res.render("login");
})
router.post("/",passport.authenticate("local",{
	
	successRedirect:"/personel",
	failureRedirect:"/",
	
	
}),function(req,res){
	
	
});


router.get("/logout",middleWare.isLoggedIn,function(req,res){
	req.logout();
	
	res.redirect("/");
	
});


module.exports=router;