if (Meteor.isClient) {
	Session.setDefault('loginmsg', '');
	Session.setDefault('registermsg', '');
	Template.login.helpers({
		errormessagelogin:function(){
			return Session.get('loginmsg');
		}
		});

	Template.register.helpers({
		errormessageregister:function(){
			return Session.get('registermsg');
		}
		});

	Template.login.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#login-username').value
      var password = t.find('#login-password').value;
        Meteor.loginWithPassword(email, password, function(err){
        if (err){
          Session.set('loginmsg', 'Invalid Login! try Again.'); 
        }else{
        	Router.go('/');
        }
      });
         return false; 
      }
  });

	Template.register.events({
    'submit #register-form' : function(e, t) {
      e.preventDefault();
      var password = t.find('#register-password').value;
      var username = t.find('#register-username').value;
        // Trim and validate the input

      Accounts.createUser({username : username, password : password}, function(err){
          if (err) {
          	Session.set('registermsg', 'Failed to Register! Try Again.');
          } else {
          	Session.set('loginmsg', '');
            Router.go('/login');
          }

        });

      return false;
    }
  });



}