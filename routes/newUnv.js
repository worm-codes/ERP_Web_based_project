var express=require("express");
var router=express.Router();
	Unvan=require("../models/unvan"),
	middleWare=require("../middleware/func");

    router.get("/",middleWare.isLoggedIn,async(req,res)=>{
	const allUnv=await Unvan.find({})
	res.render("unvan",{unvan:allUnv});
	
})


router.post("/",middleWare.isLoggedIn,async(req,res)=>{
	
	var isim=req.body.name;
	
	var check=req.body.check;
	
	
	
	await Unvan.create({isim:isim,check:check},(err,dep)=>{
		if(err){
			console.log(err);
		}else{
			res.redirect("/newunv");
			console.log(dep);
		}
	})
})

//UPDATE ROUTE
router.put("/:id",middleWare.isLoggedIn,async(req,res)=>{
	
	
	
	await Unvan.findByIdAndUpdate(req.params.id,{isim:req.body.name,check:req.body.check},function(err,update){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(update);
		res.redirect("/newunv");
	}
	})
})
router.delete("/:id",middleWare.isLoggedIn,async(req,res)=>{
	await Unvan.findByIdAndRemove(req.params.id,function(err,found){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(found);
			res.redirect('/newunv');
			
		}
	})
})	


module.exports=router;