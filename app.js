var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user"),
    moment          = require("moment");
    
//REQUIRING ROUTES
var indexRoutes = require("./routes/index");
var ordersRoutes = require("./routes/orders");

mongoose.Promise = require("bluebird");

//local connection
//mongoose.connect("mongodb://localhost/mh");

//direct path remote connection
mongoose.connect("mongodb://hugpeter:james16@ds113650.mlab.com:13650/mh_prd");

//mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Doug's honey is the best.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this will be called on every single route,
//it allows you to have global variables across web pages without passing in url
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.moment = moment;
   next();
});

//DEFINE ROUTES
app.use("/", indexRoutes);
app.use("/orders", ordersRoutes);


//LISTEN!
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Honey is ready!");
});