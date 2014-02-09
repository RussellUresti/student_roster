Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function(){ return Meteor.subscribe('students'); }
});

Router.map(function(){
  this.route('studentList', {
    path: '/'
  });
});

// Reroute logged out users to an access denied page
var requireLogin = function(){
  if(!Meteor.user()){
    if(Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
    this.stop();
  }
}

Router.before(requireLogin);