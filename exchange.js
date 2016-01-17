Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  var SearchTag = new ReactiveArray([]);
  Session.setDefault('searched', '');
  Session.setDefault('buyorsell', '0');
  Session.setDefault('subject', '');
  Session.setDefault('tag', SearchTag);

  Template.browse.helpers({
    items:function(){
      if (Session.get('buyorsell') == 0){
      return Items.find(
          {"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'},"SearchTag.name": Session.get('subject')});
    }
      else{
      return Items.find(
          {"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'}, 
           "buyorsell": Session.get('buyorsell'), 
           "SearchTag.name" : Session.get('subject')});
  }
}
}),
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
}),
    
    
  Template.browse.events({
    'submit .main-search': function (event) {
      event.preventDefault(); 
      var searchparam = event.target.searchparam.value;
      var buyorsellparam = event.target.buyorsellparam.value;
      Session.set('searched', searchparam);
      Session.set('buyorsell', buyorsellparam);
      console.log(SearchTag);
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