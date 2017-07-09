var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    passport    = require("passport"),
    User        = require("../models/user"),
    Order       = require("../models/order");
    
//INDEX - show all orders
router.get("/", function(req, res){
    //Get all orders from DB
    Order.find({}, function(err, allOrders){
       if(err){
           console.log(err);
       } else {
         res.render("home", {orders : allOrders});
       }
    }).sort({ date: 1 });
});

//show register form
router.get("/register", function(req, res) {
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);    
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Mettenburg Honey " + user.firstName + "!");    
            res.redirect("/");     
        });
    });
});

//show login form
router.get("/login", function(req, res) {
   res.render("login"); 
});

//handle login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res) {
    
});

//logout route
router.get("/logout", function(req, res) {
   req.logout(); 
   req.flash("success", "Logged you out!");
   res.redirect("/");
});

module.exports = router;