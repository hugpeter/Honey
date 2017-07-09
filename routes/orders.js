var express = require("express");
var router = express.Router({mergeParams: true});
var Order = require("../models/order");
var middleware = require("../middleware");

//CREATE - add new order to DB
router.post("/addOrder", middleware.isLoggedIn, function(req, res){
    //get data from form and add to orders array
    var num2lbGlass = req.body.num2lbGlass;
    var num1lbGlass = req.body.num1lbGlass;
    var num1lbPlastic = req.body.num1lbPlastic;
    
    //total cost - for the sake of time, i am hard coding these price values instead of referencing a database.
    //2lb glass = $14 - 1lb glass = $7 - 1lb plastic = $7
    var totalCost = req.body.num2lbGlass * 14 + req.body.num1lbGlass * 7 + req.body.num1lbPlastic * 7;
    
    var date = Date();
    var customer = req.body.firstName + ' ' + req.body.lastName;
    var email = req.body.email;
    
    var newOrder = {num2lbGlass: num2lbGlass, num1lbGlass: num1lbGlass, num1lbPlastic: num1lbPlastic, 
                    totalCost: totalCost, date: date, customer: customer, email: email};
    
    //Create a new order and save to DB
    Order.create(newOrder, function(err, newlyCreated){
       if(err){
           console.log(err);
           res.redirect("/");
       } else {
           //redirect back to home page
            req.flash("success", "Your order has been submitted!");   
            res.redirect("/");
       }
    });
});

//NEW - show form to create new order
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("orders/new"); 
});

//EDIT ORDER ROUTE
router.get("/:id/edit", function(req, res){
    Order.findById(req.params.id, function(err, foundOrder){
        if(err){
            res.redirect("/");
        } else {
            res.render("orders/edit", {order: foundOrder});
        }
    });
});

//UPDATE ORDER ROUTE
router.put("/:id", function(req, res){
  Order.findByIdAndUpdate(req.params.id, req.body.order, function(err, updatedOrder){
      if(err){
          res.redirect("/");
      } else {
          res.redirect("/");
      } 
  }) ;
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req, res){
    Order.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/");
      } else {
          res.redirect("/");
      }
    });
});

module.exports = router;