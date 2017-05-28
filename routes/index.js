var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    passport    = require("passport"),
    User        = require("../models/user");
    
//ROOT ROUTE
router.get("/", function(req, res){
   res.render("home"); 
});
