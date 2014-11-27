Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404',
    waitOn: function () {
        return Meteor.subscribe('posts');
    }
});

Router.route('/', { name: 'postsList' });

Router.route('/submit', { name: 'postSubmit' });

Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () {
        return Posts.findOne(this.params._id);
    }
})

var requireLogin = function () {
    if ( ! Meteor.user()) {
        this.render('accessDenied');
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, { only: 'postSubmit' });
Router.onBeforeAction('dataNotFound', { only: 'postPage' });
