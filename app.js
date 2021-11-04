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
    



app.set("view engine","ejs");
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/Inventory");

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




app.get("*",function(req,res){
	res.render("errorpage");
})

app.listen(process.env.PORT||3000,function(){
	console.log("The server has started");
});