Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  var tags = new ReactiveArray([]);
  Session.setDefault('searched', '');
  Session.setDefault('buyorsell', '0');
  Session.setDefault('tagVal', '');
  Session.setDefault('tags', tags);

  Template.browse.helpers({
    items:function(){
      if (Session.get('buyorsell') == 0){
      return Items.find({"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'}});
    }else{
      return Items.find({"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'}, "buyorsell": Session.get('buyorsell')});
  }
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
    return tags.splice(tags.indexOf(this) - 1, 1);
  }
}),
    
    
  Template.browse.events({
    'submit .main-search': function (event) {
      event.preventDefault(); 
      var searchparam = event.target.searchparam.value;
      var buyorsellparam = event.target.buyorsellparam.value;
      Session.set('searched', searchparam);
      Session.set('buyorsell', buyorsellparam);
      console.log(Session.get('searchparam'))      
      event.target.searchparam.value = "";
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

}


Router.route('/', {
  template: 'browse'
});