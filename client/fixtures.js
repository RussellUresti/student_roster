Meteor.startup(function(){
  Session.set("sortOrder", {
    column: 'lastName',
    direction: 'asc',
    order: {
      lastName: 1,
      termStartDate: 1,
      grade: 1
    }
  });
});