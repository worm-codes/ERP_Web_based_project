var express=require("express");
var router=express.Router();
	Urunturu=require("../models/urunturu"),
	middleWare=require("../middleware/func");





router.get("/",middleWare.isLoggedIn,async(req,res)=>{
	await Urunturu.find({},function(err,urunturleri){
		if(err){
			console.log(err);
		}
		else{
			res.render("urunturu",{urunturu:urunturleri});
		}
	});
});
router.post("/",middleWare.isLoggedIn,async(req,res)=>{
	await Urunturu.create({isim:req.body.isim},function(err,newUrunturu){
		if(err){
			console.log(err);
		}
		else{
			console.log(newUrunturu);
			res.redirect("/urunturu");
		}
	});
});
router.put("/:id",middleWare.isLoggedIn,async(req,res)=>{
	await Urunturu.findByIdAndUpdate(req.params.id,{isim:req.body.isim},function(err,updated){
		if(err){
			console.log(err);
		}
		else{
			console.log(updated);
			res.redirect("/urunturu");
		}
	});
	
});
router.delete("/:id",middleWare.isLoggedIn,async(req,res)=>{
	await Urunturu.findByIdAndRemove(req.params.id,function(err,deleted){
		if(err){
			console.log(err);
		}
		else{
			console.log("Urunturu Deleted");
			res.redirect("/urunturu");
		}
	});
});

module.exports=router;
