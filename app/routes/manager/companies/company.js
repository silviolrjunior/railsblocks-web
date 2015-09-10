import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      company: this.store.find('manager/company', params.company_id),
      themes: this.store.findAll('theme')
    });
  },
  setupController: function(controller, model) {
    if(!model.company){
      model.company = model;
      model.themes = this.store.findAll('theme');
    }
    controller.setProperties(model);
  },
  actions: {
    delete: function() {
      var company = this.currentModel.company;
      company.deleteRecord();
      company.save().then(() => {
        this.transitionTo('manager.companies');
      });
    },
    save: function() {
      var company = this.currentModel.company;
      company.save().then(() => {
        this.transitionTo('manager.companies');
      });
    },
    selectTheme: function(value){
      var company = this.currentModel.company;
      company.set('theme', value);
    }
  }
});