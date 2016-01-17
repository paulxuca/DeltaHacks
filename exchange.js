Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  Session.setDefault('searched', '');
  Session.setDefault('buyorsell', '0');
  Session.setDefault('subject', '');

  Template.browse.helpers({
    items:function(){
      if (Session.get('buyorsell') == 0){
      return Items.find(
          {"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'},"tags.name": Session.get('subject')});
    }
      else{
      return Items.find(
          {"itemname" : {$regex :".*" + Session.get('searched') + ".*", $options: 'i'}, 
           "buyorsell": Session.get('buyorsell'), 
           "tags.name" : Session.get('subject')});
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
      console.log(tags);
      event.target.searchparam.value = "";
    }
  });


}



var valueInArray = function (listOne, listTwo){
    var result = []
    for (var i = 0; i < listOne.length; i++){
        for (var j = 0; j < listTwo.length; j++){
            if (listOne[i] == listTwo[j]){
                return true
            }
        }
    }
    return false;
}

if (Meteor.isServer) {

}


Router.route('/', {
  template: 'browse'
});