if (Meteor.isClient){
	Template.itempage.helpers({
		comments:function(){
			return Comments.find({parent: Router.current().params._id},{sort: {createdAt: -1}});
		}
	});


	Template.itempage.events({
	  'submit .itemcomment': function (event) {
      event.preventDefault(); 
      var comment = event.target.comment.value;
      Comments.insert({
      	commentcontent: comment,
      	author: Meteor.user().username,
      	parent: Router.current().params._id,
      	createdAt: new Date()
      });
      event.target.comment.value ='';

    },
    'click .authorcomment':function(event){
    	console.log(this._id);

    }


	});

}


Handlebars.registerHelper('formattags', function(tags){
  temparray = [];
  for (var key in tags){
  	temparray.push(tags[key]);
  }
  return temparray;
});