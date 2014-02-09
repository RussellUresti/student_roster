Template.studentListItem.events({
  'click .delete': function(e){
    e.preventDefault();

    var currentStudent = Students.findOne(this._id);

    if(confirm("Delete this student?")){
      Students.remove(currentStudent._id);
    }
  }
});