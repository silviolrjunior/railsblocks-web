import Ember from 'ember';

export default Ember.Controller.extend({
  isEditingName: false,
  isEditingDomain: false,

  actions: {
    editDomain: function() {
      this.set("isEditingDomain", true);
    },
    doneEditingDomain: function(){
      this.set("isEditingDomain", false);
    },
    editName: function() {
      this.set("isEditingName", true);
    },
    doneEditingName: function(){
      this.set("isEditingName", false);
    }
  }
});