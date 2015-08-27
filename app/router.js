import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('admin', function() {
    this.route('companies');
    this.route('companies.company', { path: '/companies/:company_id' });
    this.route('companies.new', { path: 'companies/new' });
  });
  this.route('company', { path: 'company/:company_id' });
});

export default Router;