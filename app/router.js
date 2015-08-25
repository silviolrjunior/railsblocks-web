import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('admin', function() {
    this.route('companies', function() {
      this.route('new');
      this.route('company', { path: '/:company_id' }, function() {
        this.route('edit');
      });
    });
  });
});

export default Router;
