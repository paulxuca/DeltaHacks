if (Meteor.isClient){
	var tags = new ReactiveArray([]);
	Session.setDefault('tag', tags);
	Template.post.events({
		'submit .posting-form':function(event){
			event.preventDefault();
			console.log(Session.get('tags'));
			var formData = {
				title: event.target.title.value,
				description: event.target.description.value,
				buyorsellparam: event.target.inlineRadioOptions.value,
				author: Meteor.user().username,
				tags: Session.get('tags')
			}
			console.log(formData);
			var captchaData = grecaptcha.getResponse();

			Meteor.call('formSubmissionMethod', formData, captchaData, function(error, result) {
            // reset the captcha
            grecaptcha.reset();

            if (error) {
                console.log('There was an error: ' + error.reason);
            } else {

            console.log('Success!');
            if(formData.title == null || formData.description == null || formData.buyorsellparam > 2){
				return;
			}
			else{
			Items.insert({
			itemname: formData.title,
			description: formData.description,
			buyorsell: formData.buyorsellparam,
			dateposted: new Date(),
			author: formData.author,
			tags: formData.tags
				});
			Router.go('/');

			}


            }
        });
			}


	});



	Template.listEx.helpers({
        tag: function() {
        return tags.list();
  }
});

Template.listEx.events({
       'click #listExAdd': function() {
        if(!checkTextField(document.getElementById("listExName").value)){
            tags.push($('#listExName').val());
            Session.set('tags', tags);
            return $('#listExName').val('');
      }
  },
  'click .listExRemove': function() {
  	Session.set('tags', tags);
    return tags.remove(this.toString());            Session.set('tags', tags)

  }
});
}

var checkTextField = function (field) {
    if(field == ''){
        return true;
    }
    return false;
}