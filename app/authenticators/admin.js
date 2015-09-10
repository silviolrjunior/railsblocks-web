import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  serverTokenEndpoint: '/admins/sign_in',
  resourceName: 'admin'
});