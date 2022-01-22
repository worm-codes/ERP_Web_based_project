var express=require("express");
var router=express.Router();
	Departman=require("../models/departman"),
    Kisi=require("../models/kisi"),
    Unvan=require("../models/unvan"),
	middleWare=require("../middleware/func");

    router.get("/",middleWare.isLoggedIn,async(req,res)=>{
	await Kisi.find({},function(err,allkisi){
		if(err){
			console.log(err);
		}
		else{
			res.render("personel",{personel:allkisi});
		}
		
	})
	
})
router.get("/:id",middleWare.isLoggedIn,async(req,res)=>{
	
	var deps=await Departman.find({});
	var unv=await Unvan.find({});
	
	
	await Kisi.findById(req.params.id,function(err,found){
		if(err){
			res.render("errorpage");
		}
		else{
			res.render("editkisi",{kisi:found,unvan:unv,departman:deps});
		}
	})
	
})

router.put("/:id",middleWare.isLoggedIn,async (req,res)=>{
	

	
	var isim=req.body.name,
		lokasyon=req.body.lokasyon,
		tc=req.body.tc,
		numara=req.body.numara,
		//urun
		depart=req.body.departman,
		unv=req.body.unvan,
		dogum=req.body.dogum,
		is_giris=req.body.is_giris,
		email=req.body.eposta,
	    adres=req.body.adres,
		aciklama=req.body.aciklama;
	
	var is_cikis=req.body.is_cikis;
	
		
	
	
	await Kisi.findByIdAndUpdate(req.params.id,{isim:isim,lokasyon:lokasyon,tc:tc,numara:numara,departman:depart,unvan:unv,is_giris:is_giris,email:email,dogum:dogum,adres:adres,aciklama:aciklama,is_cikis:is_cikis},function(err,update){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(update);
		res.redirect("/personel");
	}
	})
});
router.put("/cikar/:id",middleWare.isLoggedIn,async(req,res)=>{
	await Kisi.findByIdAndUpdate(req.params.id,{is_cikis:req.body.is_cikis},function(err,update){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(update);
		res.redirect("/personel");
	}
	})
})

router.put("/pasif/:id",middleWare.isLoggedIn,async (req,res)=>{
	
	await Kisi.findByIdAndUpdate(req.params.id,{condition:false},function(err,found){
		if(err){
			console.log(err)
			res.render("errorpage");
		}
		else{
			console.log(found);
			res.redirect('/personel');
			
			
		}
	})
	
})

module.exports=router;