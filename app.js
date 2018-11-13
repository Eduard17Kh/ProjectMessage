var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    User             = require("./models/user");

// routes
var indexRoutes = require("./routes/index"), 
    sendRoutes = require("./routes/index"),
    postRoutes = require("./routes/posts");

// database connect
var url = process.env.DATABASEURL || "mongodb://localhost:27017/postsProject2"
    mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("MongoDB has started..."))
    .catch(e => console.log(e));


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(methodOverride("_method"));

// Passport configuration
// Authentication secret
app.use(require("express-session")({
    secret: "Message is a secret",
    resave: false,
    saveUninitialized: false
}));
// Passport
app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// use routes
app.use("/", indexRoutes);
app.use("/sendpost", sendRoutes);
app.use("/posts", postRoutes);


app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started");
});
