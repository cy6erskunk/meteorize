var postsData = Posts.find({}, { sort: { submitted: -1 } });
Template.postsList.helpers({
    posts: postsData
});
