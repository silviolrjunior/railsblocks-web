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
    assert.equal(find('.companies tr').length, 3);
  });
});

test('create a new company', function(assert) {
  andThen(function() {
    visit('/admin/companies/new');
    fillIn('input#name', 'Acme Inc');
    click('button#save');
  });
  andThen(function() {
    assert.equal($.trim($('.companies tr td:first').text()), 'Acme Inc');
  });
});

test('edit a company', function(assert) {
  andThen(function() {
    visit('/admin/companies/new');
    fillIn('input#name', 'Acme Inc');
    click('button#save');
    click("a:contains('Acme Inc')");
    click("a:contains('Edit')");
    fillIn('input#name', 'New Company Name');
    click('button#save');
  });
  andThen(function() {
    assert.equal($.trim($('.companies tr td:first').text()), 'New Company Name');
  });
});

test('delete a company', function(assert) {
  andThen(function() {
    visit('/admin/companies/new');
    fillIn('input#name', 'Acme Inc');
    click('button#save');
    click("a:contains('Acme Inc')");
    click("button:contains('Delete')");
  });
  andThen(function() {
    assert.equal($.trim($('.companies tr td:first').text()), 'No company yet!');
  });
});


test('edit the theme company', function(assert) {
  server.createList('company', 1);
  andThen(function() {
    visit('/reseller/company');
    click("a:contains('Edit')");
    select('#theme-select', 'black');
    click('button#save');
  });
  andThen(function() {
    assert.equal($.trim($('.theme span:last').text()), 'black');
  });
});

