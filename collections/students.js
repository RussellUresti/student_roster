Students = new Meteor.Collection('students');

// Allow for client removal of items (so removal is immediate instead of taking a server trip)
Students.allow({
  remove: function(userId, doc){
    return !! userId;
  }
});

Meteor.methods({
  post: function(studentAttributes){
    var user = Meteor.user(),
        post;

    // you're logged in, right?
    if(!user){
      throw new Meteor.Error(401, "Adding students is only accessible for logged in users.");
    }

    // make sure there's at least a last name
    if(!studentAttributes.lastName){
      throw new Meteor.Error(422, "Student requies a last name");
    }

    // cherry pick our desired data to prevent any console injections
    post = _.pick(studentAttributes,'firstName','lastName','termStartDate','termEndDate','grade');

    Students.insert(post);

    return studentAttributes.url;
  },
  remove: function(student){
    Students.remove(student);
  }
});