var middleWareObj={};




middleWareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		res.redirect("/");
		
	}
}
middleWareObj.isLogged=function(req,res,next){
	if(!req.user){
		return next();
	}
	else{
		res.redirect("/personel");
		
	}
}


module.exports=middleWareObj;