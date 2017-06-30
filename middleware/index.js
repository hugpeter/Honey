//var User = require("../models/user");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash("error", "Please log in to place an order.");
    res.redirect("/login");
};

module.exports = middlewareObj;



