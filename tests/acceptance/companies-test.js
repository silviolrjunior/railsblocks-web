import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'railsblocks-web/tests/helpers/start-app';

module('Acceptance | companies', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('manager listing companies', function(assert) {
  server.createList('company', 3);

  andThen(function() {  
    visit('/login/manager');
    fillIn('input#email', 'manager@manager.com');
    fillIn('input#password', '12341234');
    click("button:contains('Login')");
    visit('/manager/companies');
  });

  andThen(function() {
    assert.equal(currentURL(), '/manager/companies');
  });
  
  andThen(function() {
    assert.equal(find('.companies .s-element-item').length, 3);
  });
});

test('manager create a new company', function(assert) {
  andThen(function() {  
    visit('/login/manager');
    fillIn('input#email', 'manager@manager.com');
    fillIn('input#password', '12341234');
    click("button:contains('Login')");
  });

  andThen(function() {
    visit('/manager/companies/new');
    fillIn('input#name', 'Acme Inc');
    fillIn('input#domain', 'acme.com');
    click('button#save');
  });
  andThen(function() {
    assert.equal($.trim($('.companies .s-element-item span').text()), 'Acme Inc');
  });
});

test('manager edit a company', function(assert) {
  server.create('company', {name: 'Foo Inc.'});
  
  andThen(function() {  
    visit('/login/manager');
    fillIn('input#email', 'manager@manager.com');
    fillIn('input#password', '12341234');
    click("button:contains('Login')");
  });

  andThen(function() {
    visit('/manager/companies');
    click("a:contains('Foo Inc.')");
    click("button:contains('Edit Name')");
    fillIn('input#name', 'New Company Name');
    click("button:contains('Done')");
    click('button#save_bottom');
  });
  andThen(function() {
    assert.equal($.trim($('.companies .s-element-item span').text()), 'New Company Name');
  });
});

test('manager delete a company', function(assert) {
  server.create('company', {name: 'Foo Inc.'});
  
  andThen(function() {  
    visit('/login/manager');
    fillIn('input#email', 'manager@manager.com');
    fillIn('input#password', '12341234');
    click("button:contains('Login')");
  });

  andThen(function() {
    visit('/manager/companies');
    click("a:contains('Foo Inc.')");
    click("a:contains('Delete Company')");
  });
  andThen(function() {
    assert.equal($.trim($('.companies .s-element-item span').text()), 'No company yet!');
  });
});


test('admin company edit your theme', function(assert) {
  server.create('company');
  server.create('theme', {name: 'black'});
  server.create('theme', {name: 'white'});
  andThen(function() {
    visit('/login/admin');
    fillIn('input#email', 'admin@admin.com');
    fillIn('input#password', '12341234');
    click("button:contains('Login')");
    
    visit('admin/company');
    select('#theme-select', 'black');
    click('button#save_bottom');
    visit('admin/company');
  });
  andThen(function() {
    assert.equal($.trim($('.theme span').text()), 'black');
  });
});

test('admin company edit your domain', function(assert) {
  server.create('company', { domain: 'foo.com'});
  server.createList('theme', 3);
  andThen(function() {
    visit('/login/admin');
    fillIn('input#email', 'admin@admin.com');
    fillIn('input#password', '12341234');
    click("button:contains('Login')");

    visit('/admin/company');
    click("button:contains('Edit Domain')");
    fillIn('input#domain', 'acme.com');
    click("button:contains('Done')");
    click('button#save_bottom');
    visit('admin/company');
  });
  andThen(function() {
    assert.equal($.trim($('.domain td').text()), 'acme.com');
  });
});