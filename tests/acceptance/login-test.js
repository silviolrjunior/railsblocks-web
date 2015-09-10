import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'railsblocks-web/tests/helpers/start-app';

module('Acceptance | login', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('manager login', function(assert) {

  visit('/manager');
  fillIn('input#email', 'manager@manager.com');
  fillIn('input#password', '12341234');
  click("button:contains('Login')");

  andThen(function() {
    assert.equal(currentURL(), '/manager');
  });

  andThen(function() {
    assert.equal($.trim($('h1').text().match(/Welcome to Manager Panel/)), 'Welcome to Manager Panel');
  });
});

test('admin login', function(assert) {
  
  visit('/admin');
  fillIn('input#email', 'admin@admin.com');
  fillIn('input#password', '12341234');
  click("button:contains('Login')");

  andThen(function() {
    assert.equal(currentURL(), '/admin');
  });

  andThen(function() {
    assert.equal($.trim($('h1').text().match(/Welcome to Admin Panel/)), 'Welcome to Admin Panel');
  });
});