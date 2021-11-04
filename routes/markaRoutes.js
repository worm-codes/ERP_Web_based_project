var express=require("express");
var router=express.Router();
	Marka=require("../models/marka"),
	middleWare=require("../middleware/func");


    router.get("/",middleWare.isLoggedIn, async(req, res)=>{
    await Marka.find({},function(err,Allmarka){
        if(err){
            console.log(err);
        }
        else{
            res.render("marka",{marka:Allmarka});
        }
    });
});

router.post("/",middleWare.isLoggedIn, async(req, res)=>{
    var isim = req.body.isim;

    await Marka.create({isim:isim},function(err,marka){
        if(err){
            console.log(err);
        }
        else {
            console.log(marka);
            res.redirect("/marka");
        }
    });
});

router.put("/:id",middleWare.isLoggedIn, async(req, res)=>{
    await Marka.findByIdAndUpdate(req.params.id, {isim:req.body.isim}, function(err, updatedMarka){
        if(err) {
            console.log(err);
        }
        else {
            console.log(updatedMarka);
            res.redirect("/marka");
        }
    });
});

router.delete("/:id",middleWare.isLoggedIn, async(req, res)=>{
   await Marka.findByIdAndRemove(req.params.id, function(err, deletedMarka){
        if(err) {
            res.redirect("/marka");
        }
        else {
            res.redirect("/marka");
        }
    });
});


module.exports=router;