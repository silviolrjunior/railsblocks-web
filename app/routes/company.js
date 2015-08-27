import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      company: this.store.find('company', params.company_id),
      themes: this.store.findAll('theme')
    });
  },
  serialize: function(company) {
    return {
      company_id: company.get('company_id')
    };
  },
  setupController: function(controller, model) {
    if(!model.company){
      model.company = model;
      model.themes = this.store.findAll('theme');
    }
    controller.setProperties(model);
  },
  actions: {
    save: function() {
      var company = this.currentModel.company;
      company.save().then(() => {
        this.transitionTo('company');
      });
    },
    selectTheme: function(value){
      var company = this.currentModel.company;
      company.set('theme', value);
    }
  }
});
