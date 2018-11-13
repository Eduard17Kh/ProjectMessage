var express = require("express"),
    router  = express.Router(),
    Post    = require("../models/post");

// Posts route
router.get("/posts", function(req, res){
    res.render("messages");
});

// Create a new posts
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var texts = req.body.texts;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newPost = { name: name, texts: texts, author: author };
    Post.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            console.log(newlyCreated);
            res.redirect("/posts");
        };
    });
});

// Show all posts
router.get("/", function(req, res){
    Post.find({}, function(err, allPost){
        if(err){
            console.log(err);
        } else{
            res.render("messages",{posts: allPost});
        };
    });
});

// block adding a comment if user not logged in
function isLoggedIn (req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/login");
    };
};

module.exports = router;
