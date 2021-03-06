Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function (userId, doc) {
        return ownsDocument(userId, doc);
    },
    remove: function (userId, doc) {
        return ownsDocument(userId, doc);
    }
});

Posts.deny({
    update: function (userId, doc, fields) {
        return (_.without(fields, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    postInsert: function (postAttrs) {
        check(Meteor.userId(), String);
        check(postAttrs, {
            url: String,
            title: String
        });

        var postWithTheSameLink = Posts.findOne({ url: postAttrs.url});
        if (postWithTheSameLink) {
            return {
                postExists: true,
                _id: postWithTheSameLink._id
            };
        }

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
