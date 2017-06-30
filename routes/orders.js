var express = require("express");
var router = express.Router({mergeParams: true});
var Order = require("../models/order");
var middleware = require("../middleware");

//CREATE - add new order to DB
router.post("/addOrder", middleware.isLoggedIn, function(req, res){
    //get data from form and add to orders array
    var orderID = req.body.username + Date();
    var num2lbGlass = req.body.num2lbGlass;
    var num1lbGlass = req.body.num1lbGlass;
    var num1lbPlastic = req.body.num1lbPlastic;
    //total cost
    //2lb glass = $14
    //1lb glass = $7
    //1lb plastic = $7
    var totalCost = req.body.num2lbGlass * 14 + req.body.num1lbGlass * 7 + req.body.num1lbPlastic * 7;
    var date = Date();
    var customer = req.body.firstName + ' ' + req.body.lastName;
    var email = req.body.email;
    
    var newOrder = {orderID: orderID, num2lbGlass: num2lbGlass, num1lbGlass: num1lbGlass, num1lbPlastic: num1lbPlastic, 
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
// router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
//     Order.findById(req.params.id, function(err, foundCampground){
//         res.render("campgrounds/edit", {campground: foundCampground});
//     });
// });

// //UPDATE ORDER ROUTE
// router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
//   Order.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//       if(err){
//           res.redirect("/campgrounds");
//       } else {
//           res.redirect("/campgrounds/" + req.params.id);
//       } 
//   }) ;
// });

// //DESTROY CAMPGROUND ROUTE
// router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
//     Order.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/campgrounds");
//       } else {
//           res.redirect("/campgrounds");
//       }
//     });
// });

module.exports = router;