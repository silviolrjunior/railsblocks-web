import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('company');
  },
  actions: {  
    save: function() {
      var company = this.currentModel;
      company.save().then(() => {
        this.transitionTo('companies');
      });
    },

    delete: function() {
    if(this.currentModel.get('id')==null) {
      store.deleteRecord(post);
    }
    }
  }
});