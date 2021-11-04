var express=require("express");
var router=express.Router();
	Departman=require("../models/departman"),
	middleWare=require("../middleware/func");

    router.get("/",middleWare.isLoggedIn,async(req,res)=>{
	const alldep=await Departman.find({});
	res.render("newdep",{departman:alldep});
})
//UPDATE ROUTE
router.put("/:id",middleWare.isLoggedIn,async(req,res)=>{
	
	
	
	await Departman.findByIdAndUpdate(req.params.id,{isim:req.body.name,check:req.body.check},function(err,update){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(update);
			res.redirect("/newdep");
		
	}
	})
	
})
router.delete("/:id",middleWare.isLoggedIn,async(req,res)=>{
	await Departman.findByIdAndRemove(req.params.id,(err,found)=>{
		if(err){
			res.render("errorpage");
		}
		else{
			console.log("DEPARTMAN DELETED")
			res.redirect('/newdep');
		}
	})
})	

router.post("/",middleWare.isLoggedIn,async(req,res)=>{
	var isim=req.body.name;
	
	var check=req.body.check;
	
	
	
	await Departman.create({isim:isim,check:check},(err,dep)=>{
		if(err){
			console.log(err);
		}else{
			res.redirect("/newdep");
			console.log(dep);
		}
	})
})
module.exports=router;