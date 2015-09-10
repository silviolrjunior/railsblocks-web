import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      company: this.store.findAll('admin/company').then(function (companies) {
        return companies.get('firstObject');}),
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
    save: function() {
      var company = this.currentModel.company;
      company.save().then(() => {
        this.transitionTo('admin');
      });
    },
    selectTheme: function(value){
      var company = this.currentModel.company;
      company.set('theme', value);
    }
  }
});
