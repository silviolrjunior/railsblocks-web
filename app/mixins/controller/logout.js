import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Mixin.create({
  session: service('session'),
  scopes: service('session-scopes'),

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});