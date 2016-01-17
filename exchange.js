Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  Meteor.subscribe('items');
  Meteor.subscribe('comments');
  Session.setDefault('searched', '');
  Session.setDefault('buyorsell', '0');

  Template.browse.helpers({

    items:function(){
      if (Session.get('buyorsell') == 0){
      return Items.find({"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'}});
    }else{
      return Items.find({"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'}, "buyorsell": Session.get('buyorsell')});
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
      event.target.searchparam.value = "";
    }
  });


}

if (Meteor.isServer) {
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

Router.route('/items/:_id', {
    name: 'itempage',
    template: 'itempage',
    data: function(){
      var currentItem = this.params._id;
      return Items.findOne({_id: currentItem});
    }
});