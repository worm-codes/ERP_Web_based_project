var express=require("express"),
mongoose=require("mongoose"),
	passport=require("passport"),
	LocalStrategy=require("passport-local"),
	expressSanitizer = require("express-sanitizer"),
    methodOverride=require("method-override"),
	User=require("./models/user.js"),
    app=express();

	///////routes
	var authRoutes=require("./routes/auth");
	var newPersonRoutes=require("./routes/newPerson");
	var newDepRoutes=require("./routes/newDep");
	var newUnvRoutes=require("./routes/newUnv");
	var personelRoutes=require("./routes/personel");
	var modelRoutes=require("./routes/modelRoutes");
	var urunTuruRoutes=require("./routes/urunTuruRoutes");
	var markaRoutes=require("./routes/markaRoutes");
	var newZimmetToPersonel=require("./routes/newZimmet");
	var zimmetDokum=require("./routes/zimmetDokum")
    


app.use(express.static('public'));
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect("mongodb://localhost/Inventory", { useNewUrlParser: true, useUnifiedTopology: true });


//PASSPORT CONFIGURATION
  app.use(require("express-session")({
		secret:"Oguzhan Cevik",
		resave:false,
		saveUnitialized:false
		}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//local var
app.use(function(req,res,next){
	res.locals.currentUser=req.user;//for currentUser
	
	
	next();
});
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
mongoose.set('useFindAndModify', false);




//new person 
//usage UNVAN DEPARTMAN Kisi

app.use("/newkisi",newPersonRoutes);

//new departman
//usage  Departman

app.use("/newdep",newDepRoutes);

//UNVAN
//usage Unvan 

app.use("/newunv",newUnvRoutes);

//personel page
//usage Kisi Departman Unvan
app.use("/personel",personelRoutes);

//////////AUTH ROUTES
app.use("/",authRoutes);


//ZİMMET MODEL MARKA URUNTURU

//MODEL
//usage Urunturu Marka Model

app.use("/model",modelRoutes);

//Urunturu
//usage Urunturu

app.use("/urunturu",urunTuruRoutes);

//marka
//usage marka

app.use("/marka",markaRoutes);

//add zimmet to personel
//usage Kisi Model Departman Zimmet 

app.use("/personel",newZimmetToPersonel);

//zimmet dokum 

app.use("/zimmet",zimmetDokum);

/////////////////////////////////////REGİSTER

//show register form
app.get("/register",function(req,res){
	res.render("register");
})
//handle sign up logic
app.post("/register",function(req,res){
	var newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			
			return res.render("register");
		}
		else{
			passport.authenticate("local")(req,res,function(){
            
				res.redirect("/personel");
			})
			
		}
	})
});




app.get("*",function(req,res){
	res.render("errorpage");
})

app.listen(process.env.PORT||3000,function(){
	console.log("The server has started");
});
