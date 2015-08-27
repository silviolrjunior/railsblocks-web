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

test('visiting /admin/companies', function(assert) {
  server.createList('company', 3);
  visit('/admin/companies');

  andThen(function() {
    assert.equal(currentURL(), '/admin/companies');
  });
  andThen(function() {
    assert.equal(find('.companies .companies-item').length, 3);
  });
});

test('create a new company', function(assert) {
  andThen(function() {
    visit('/admin/companies/new');
    fillIn('input#name', 'Acme Inc');
    click('button#save');
  });
  andThen(function() {
    assert.equal($.trim($('.companies .companies-item span').text()), 'Acme Inc');
  });
});

test('edit a company', function(assert) {
  andThen(function() {
    visit('/admin/companies/new');
    fillIn('input#name', 'Acme Inc');
    click('button#save');
    click("a:contains('Acme Inc')");
    click("button:contains('Change Name')");
    fillIn('input#name', 'New Company Name');
    click('button#save_bottom');
  });
  andThen(function() {
    assert.equal($.trim($('.companies .companies-item span').text()), 'New Company Name');
  });
});

test('delete a company', function(assert) {
  andThen(function() {
    visit('/admin/companies/new');
    fillIn('input#name', 'Acme Inc');
    click('button#save');
    click("a:contains('Acme Inc')");
    click("a:contains('Delete Company')");
  });
  andThen(function() {
    assert.equal($.trim($('.companies .companies-item span').text()), 'No company yet!');
  });
});


test('edit the theme company', function(assert) {
  server.createList('company', 1);
  server.create('theme', {name: 'black'});
  server.create('theme', {name: 'white'});
  andThen(function() {
    visit('/company/1');
    select('#theme-select', 'black');
    click('button#save_bottom');
  });
  andThen(function() {
    assert.equal($.trim($('.theme span').text()), 'black');
  });
});

