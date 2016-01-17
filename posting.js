if (Meteor.isClient){
    var tags = new ReactiveArray([]);
    Session.setDefault('tag', tags);
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
	}),
    Template.listEx.helpers({
        tag: function() {
        return tags.list();
  }
});

    Template.listEx.events({
        'click #listExAdd': function() {
        if(!checkTextField(document.getElementById("listExName").value)){
            tags.push($('#listExName').val());
            return $('#listExName').val('');
      }
  },
  'click .listExRemove': function() {
    return tags.remove(this.toString());
  }
});


}
var checkTextField = function (field) {
    if(field == ''){
        return true;
    }
    return false;
}
Router.route('/post',{
    template: "post"
});