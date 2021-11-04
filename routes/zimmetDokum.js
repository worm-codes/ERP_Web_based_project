var express=require("express");
var router=express.Router();
	Departman=require("../models/departman"),
    Kisi=require("../models/kisi"),
    Model=require("../models/model"),
    Zimmet=require("../models/zimmet"),
	middleWare=require("../middleware/func");





router.get("/",middleWare.isLoggedIn,async(req,res)=>{

	await Kisi.find().populate("zimmet").exec(async(err,allKisi)=>{
		if(err){
			console.log(err);
		}
		else{
			await Departman.find().populate("zimmet").exec(async(err,alldep)=>{
		if(err){
			console.log(err);
		}
		else{
			
			await Model.find({},function(err,Modeller){
				if(err){
					console.log(err);
				}
				else{
					res.render("zimmet",{personel:allKisi,model:Modeller,departman:alldep});
				}
			})
	
		}
	})
			
	
			
		}
	})
	
	
})

module.exports=router;