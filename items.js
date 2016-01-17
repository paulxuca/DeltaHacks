Comments = new Meteor.Collection('comments');

if (Meteor.isClient){
	Template.itempage.helpers({
		comments:function(){
			return Comments.find({parent: Router.current().params._id});
		}
	});

	Template.itempage.events({
	  'submit .itemcomment': function (event) {
      event.preventDefault(); 
      var comment = event.target.comment.value;
      Comments.insert({
      	commentcontent: comment,
      	author: Meteor.user().username,
      	parent: Router.current().params._id
      });
      event.target.comment.value ='';

    }


	});

}