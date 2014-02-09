Template.addStudent.events({
  'submit form': function(e){
    e.preventDefault();
    var form = $(e.target),
        names = form.find("[name='name']").val().split(' '),
        firstName = '',
        lastName = names[names.length-1];

    // Determine whether the name provided contained one, two, or 3+ words
    if(names.length > 1){
      if(names.length > 2){
        for (i = 0; i <= names.length - 2; i++) {
          firstName += ' ' + names[i];
        }
        firstName = firstName.substring(1);
      } else {
        firstName = names[0];
      }
    }

    var post = {
      firstName: firstName,
      lastName: lastName,
      termStartDate: form.find("[name='termStartDate']").val(),
      termEndDate: form.find("[name='termEndDate']").val(),
      grade: form.find("[name='grade']").val()
    };

    Meteor.call('post', post, function(error) {
      if(error) {
        return alert(error.reason);
      }
      form[0].reset();
      $('#add-student-modal').modal('hide');
    });
  }
});