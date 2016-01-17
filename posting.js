if (Meteor.isClient){
	Template.post.events({
		'submit .posting-form':function(event){
			event.preventDefault();
			var title = event.target.title.value;
			var description = event.target.description.value;
			var buyorsellparam = event.target.inlineRadioOptions.value;
			var author = Meteor.user().username;
			console.log(buyorsellparam);
			Items.insert({
				itemname: title,
				description: description,
				buyorsell: buyorsellparam,
				dateposted: new Date(),
				author: author
			});

		}
	});
	


}