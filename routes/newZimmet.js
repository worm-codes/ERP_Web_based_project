var express=require("express");
var router=express.Router();
	Departman=require("../models/departman"),
    Kisi=require("../models/kisi"),
    Model=require("../models/model"),
    Zimmet=require("../models/zimmet"),
	middleWare=require("../middleware/func");


    router.get("/:id/yeniZimmet",middleWare.isLoggedIn, async(req, res)=>{
		
		
   
	await Kisi.countDocuments({_id: req.params.id}, async (err, count)=>{
        
        
        
		
    if(count>0){
       
		await Kisi.findById(req.params.id).populate("zimmet").exec(async(err,person)=>{
	     console.log(person)
        if(err){
			
            console.log(err);

        }else{
           await Model.find({},function(err,model){
		if(err){
			console.log(err);
		}
		else{
             console.log(person)
               res.render('yeniZimmet',{personel:person,model:model});
			
		}
	})
        }
    }
	)
  
       
    }
		else{
			

			await Departman.findById(req.params.id).populate("zimmet").exec(async(err,dep)=>{
	
        if(err){
            console.log(err);

        }else{
          await Model.find({},function(err,model){
		if(err){
			console.log(err);
		}
		else{
			
			res.render('yeniZimmet',{personel:dep,model:model});
		}
	})
        }
    })
	
		}
			
		
}); 
       
    });


router.post("/:id/yeniZimmet",middleWare.isLoggedIn, async(req, res)=>{

    var adet = req.body.adet,
     serino = req.body.serino,
     zim_bas = req.body.zim_bas,
     zim_bit = req.body.zim_bit,
     aciklama = req.body.aciklama;
	
  await Kisi.count({_id: req.params.id}, async (err, count)=>{ 
    if(count>0){
		
		await Kisi.findById(req.params.id,(err,found)=>{
		if(err){
			console.log(err);
		}
		else{
			 Zimmet.create({adet:adet,serino:serino,zim_bas:zim_bas,zim_bit:zim_bit,aciklama:aciklama,status:true,modelid:req.body.model},function(err,urun){
        if(err){
            console.log(err);
        }
        else{
			
		
		 	found.zimmet.push(urun);
		 	found.save();
		   console.log(urun);
	      res.redirect("back");
         
			
			
        }
    });
			
			
		}
	})
		
    }
	else{
		await Departman.findById(req.params.id,async(err,dep)=>{
		if(err){
			console.log(err);
		}
		else{
	    Zimmet.create({status:true,adet:adet,serino:serino,zim_bas:zim_bas,zim_bit:zim_bit,aciklama:aciklama,modelid:req.body.model},function(err,urun){
        if(err){
            console.log(err);
        }
        else{
			
           
			dep.zimmet.push(urun);
			dep.save();
			 console.log(urun);
	      res.redirect("back");
			
        }
    });
			
			
		}
	})
	}
});

router.put("/:id/yeniZimmet",middleWare.isLoggedIn,async(req,res)=>{
	
	var adet = req.body.adet,
     serino = req.body.serino,
     zim_bas = req.body.zim_bas,
     zim_bit = req.body.zim_bit,
     aciklama = req.body.aciklama,
	 model=req.body.model;

		
    await Zimmet.findByIdAndUpdate(req.params.id,{adet:adet,serino:serino,zim_bas:zim_bas,zim_bit:zim_bit,aciklama:aciklama,modelid:model},function(err,found){
		if(err){
			console.log(err);
		}
		else{
			console.log(found);
			res.redirect("back");
		
		   }
	});
		
   
	


});

});

router.put("/:id/pasifZimmet",middleWare.isLoggedIn,async(req,res)=>{
	await Zimmet.findByIdAndUpdate(req.params.id,{status:false},function(err,found){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(found);
			res.redirect('back');
			
		}
	})
})


module.exports=router;

