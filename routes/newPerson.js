var express=require("express");
var router=express.Router();
	Departman=require("../models/departman"),
    Kisi=require("../models/kisi"),
    Unvan=require("../models/unvan"),
	middleWare=require("../middleware/func");


    
router.get("/",middleWare.isLoggedIn, async (req, res) =>{
	const deps= await Departman.find({})
	
	const allUnv=await Unvan.find({});
	res.render('newkisi',{departman:deps,unvan:allUnv});

});
router.post("/",middleWare.isLoggedIn,async(req,res)=>{
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
		
	await Kisi.create({isim:isim,lokasyon:lokasyon,tc:tc,numara:numara,departman:depart,unvan:unv,is_giris:is_giris,email:email,dogum:dogum,adres:adres,aciklama:aciklama,condition:true},function(err,kisi){
		if(err){
			console.log(err);
		}
		else{
			
			console.log(kisi);
			res.redirect("/personel");
		}
	})
	
	
})

module.exports=router;