Template.postItem.helpers({
    domain: function () {
        var anchor = document.createElement('a');
        anchor.href = this.url;
        return anchor.hostname;
    },
    ownPost: function () {
        return this.userId === Meteor.userId();
    }
})
