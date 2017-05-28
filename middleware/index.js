//var User = require("../models/user");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash("error", "Please log in to add your name to the list!");
    res.redirect("/login");
};

module.exports = middlewareObj;



