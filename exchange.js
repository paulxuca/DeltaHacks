Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  Session.setDefault('searched', '');
  Session.setDefault('buyorsell', '0');

  Template.browse.helpers({

    items:function(){
      if (Session.get('buyorsell') == 0){
      return Items.find({"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'}});
    }else{
      return Items.find({"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'}, "buyorsell": Session.get('buyorsell')});
    }
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

}


Router.route('/', {
  template: 'browse'
});