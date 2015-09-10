import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  serverTokenEndpoint: '/managers/sign_in',
  resourceName: 'manager'
});