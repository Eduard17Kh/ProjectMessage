var mongoose         = require('mongoose');

var postsSchema = new mongoose.Schema({
    name: String,
    texts: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        username: String
     }
});

module.exports = mongoose.model("Post", postsSchema);