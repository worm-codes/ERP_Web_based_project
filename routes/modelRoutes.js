var express=require("express");
var router=express.Router();
	Departman=require("../models/departman"),
   Urunturu=require("../models/urunturu.js"),
    Model=require("../models/model.js"),
     Marka=require("../models/marka.js"),
	middleWare=require("../middleware/func");


    router.get("/",middleWare.isLoggedIn,async(req,res)=>{
	const urun=await Urunturu.find({});
	const marka=await Marka.find({});
	

	await Model.find({},function(err,allModel){
		if(err){
			console.log(err);
		}
		else{
			res.render("model",{model:allModel,marka:marka,urunturu:urun});
		}
		
	});
	
	
});

router.post("/",middleWare.isLoggedIn,async(req,res)=>{
	var isim=req.body.isim,
		urunturu=req.body.urunturu,
		marka=req.body.marka,
		aciklama=req.body.aciklama;
	await Model.create({isim:isim,aciklama:aciklama,urun_turu:urunturu,marka:marka},function(err,newModel){
		if(err){
			console.log(err);
		}
		else{
			
			res.redirect("/model");
			console.log(newModel);
			
		}
	});
		

});
//update model
router.put("/:id",middleWare.isLoggedIn,async(req,res)=>{
	await Model.findByIdAndUpdate(req.params.id,{isim:req.body.isim,aciklama:req.body.aciklama,urun_turu:req.body.urunturu,marka:req.body.marka},function(err,updated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/model");
			console.log(updated);
		
			
		}
	});
});
router.delete("/:id",middleWare.isLoggedIn,async(req,res)=>{
	await Model.findByIdAndRemove(req.params.id,function(err,deleted){
		if(err){
			console.log(err);
		}
		else{
			
			res.redirect("/model");
			console.log("Model Deleted");
		}
	});
});

module.exports=router;
