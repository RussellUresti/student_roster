Template.studentList.helpers({
  students: function(){
    // Default ascending name sort
    return Students.find({}, { sort: Session.get('sortOrder').order });
  }
});

// when rendered, attach appropriate classes
Template.studentList.rendered = function() {
  var sorting = Session.get('sortOrder'),
      sortingColumn = sorting.column,
      sortingDir = sorting.direction;

  $('.sorting').removeClass('sorting-asc sorting-desc');
  $('.sorting[data-name=' + sortingColumn + ']').addClass('sorting-' + sortingDir);
}

// sort when clicking the column header
Template.studentList.events({
  'click .sorting': function(e){
    var $this = $(e.target),
        sortBy = $this.data('name'),
        sortOrder = $this.hasClass('sorting-asc') ? 'desc' : 'asc';

    // sorting is set up as a switch for future support of sorting by termStartDate and grade
    switch(sortBy) {
      case 'lastName':
      default:
        Session.set('sortOrder', {
          column: 'lastName',
          direction: sortOrder,
          order: {
            lastName: (sortOrder === 'desc' ? -1 : 1),
            termStartDate: 1,
            grade: 1
          }
        });
        break;
    }
  }
});