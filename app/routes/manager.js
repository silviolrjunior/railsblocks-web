import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel(transition) {
    let superResult = this._super(transition);

    let isAuthenticated = this.get('session.isAuthenticated');
    let isManager = (this.get('session.session.authenticator') === 'authenticator:manager');

    if (!isAuthenticated || (!isManager)) {
      transition.abort();
      this.get('session').set('attemptedTransition', transition);
      Ember.assert('The route configured as Configuration.authenticationRoute cannot implement the AuthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== 'login.manager');
      this.transitionTo('login.manager');
    }

    return superResult;
  }
}); 
