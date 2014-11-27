Posts = new Mongo.Collection('posts');

Meteor.methods({
    postInsert: function (postAttrs) {
        check(Meteor.userId(), String);
        check(postAttrs, {
            url: String,
            title: String
        });

        var user  = Meteor.user();
        var post = _.extend(postAttrs, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    }
});
