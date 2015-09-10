import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('admin', function(){
    this.route('company');
  });
  this.route('manager', function() {
    this.route('companies', function(){
      this.route('company', { path: '/:company_id' });
      this.route('new');
    });
  });
  this.route('login', function(){
    this.route('admin');
    this.route('manager');
  });
  this.route('logout', function(){
    this.route('admin');
    this.route('manager');
  });
});

export default Router;