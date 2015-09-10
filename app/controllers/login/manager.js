import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  scopes: service('session-scopes'),

  actions: {
    authenticate: function() {
      var data = this.getProperties('identification', 'password');
      var scopes = this.get('scopes');
      var session = this.get('session');

      return session.authenticate('authenticator:manager', data).then(function() {
        scopes.login(session, 'manager');
      }, function() {
      });
    }
  }
});