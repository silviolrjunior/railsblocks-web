import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save: function() {
      var company = this.currentModel;
      company.save().then(() => {
        this.transitionTo('admin.companies.company', company.id);
      });
    }
  }
});
