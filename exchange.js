Items = new Meteor.Collection('items');
Comments = new Meteor.Collection('comments');

if (Meteor.isClient) {
  Meteor.startup(function() {
    reCAPTCHA.config({
        publickey: '6LfalhUTAAAAABalHXloAjC--UAJD9eXz39X0XMk'
    });
  });
  var SearchTag = new ReactiveArray([]);
  Meteor.subscribe('items');
  Meteor.subscribe('comments');
  Session.setDefault('searched', '');
  Session.setDefault('buyorsell', '0');
  Session.setDefault('tag', SearchTag);

  Template.browse.helpers({

    items:function(){
      if (Session.get('buyorsell') == 0){
      return Items.find({"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'}}, {sort: {createdAt: -1}});
    }else{
      return Items.find({"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'}, "buyorsell": Session.get('buyorsell')}, {sort: {createdAt: -1}});
  }
},
  username:function(){
    return " " + Meteor.user().username;
  }
  });

  Template.browse.events({
    'submit .main-search': function (event) {
      event.preventDefault(); 
      var searchparam = event.target.searchparam.value;
      var buyorsellparam = event.target.buyorsellparam.value;
      Session.set('searched', searchparam);
      Session.set('buyorsell', buyorsellparam);
      console.log(Session.get('buyorsell'))
    },
    'click #signout':function(event){
      Meteor.logout();
    }
  });

 Template.MainTag.helpers({
        tag: function() {
        return SearchTag.list();
  }
});

Template.MainTag.events({
       'click #MainTagAdd': function() {
        if(!checkTextField(document.getElementById("MainTagName").value)){
            SearchTag.push($('#MainTagName').val());
            return $('#MainTagName').val('');
      }
  },
  'click .MainTagRemove': function() {
    return SearchTag.remove(this.toString());
  }
});



}

var checkTextField = function (field) {
    if(field == ''){
        return true;
    }
    return false;
}


if (Meteor.isServer) {




  Items.allow({
    'insert': function (userId,doc) {
      return !! userId; 
    }
  });

  Comments.allow({
    'insert':function(userId,doc){
      return !! userId;
    }
  });


Meteor.publish('items', function () {
    return Items.find();
  });

Meteor.publish('comments', function () {
    return Comments.find();
  });
}


Router.route('/', {
  template: 'browse'
});

Router.route('/login', {
  template:'login'
}
);

Router.route('/register', {
  template:'register'
}
);

Router.route('/post',{
  onBeforeAction:function(pause){
  if (!Meteor.user()) {
            // render the login template but keep the url in the browser the same
            this.render('login');
  }else{
    this.render('post');
  }
}
});

Router.route('/items/:_id', {
    name: 'itempage',
    template: 'itempage',
    data: function(){
      var currentItem = this.params._id;
      return Items.findOne({_id: currentItem});
    }
});