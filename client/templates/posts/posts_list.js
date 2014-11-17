var postsData = Posts.find();
Template.postsList.helpers({
    posts: postsData
});
