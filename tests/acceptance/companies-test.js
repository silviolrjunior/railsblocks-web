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

test('admin listing companies', function(assert) {
  server.createList('company', 3);
  visit('/admin/companies');

  andThen(function() {
    assert.equal(currentURL(), '/admin/companies');
  });
  andThen(function() {
    assert.equal(find('.companies .s-element-item').length, 3);
  });
});

test('admin create a new company', function(assert) {
  andThen(function() {
    visit('/admin/companies/new');
    fillIn('input#name', 'Acme Inc');
    fillIn('input#domain', 'acme.com');
    click('button#save');
  });
  andThen(function() {
    assert.equal($.trim($('.companies .s-element-item span').text()), 'Acme Inc');
  });
});

test('admin edit a company', function(assert) {
  server.create('company', {name: 'Foo Inc.'});
  andThen(function() {
    visit('/admin/companies');
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

test('admin delete a company', function(assert) {
  server.create('company', {name: 'Foo Inc.'});
  andThen(function() {
    visit('/admin/companies');
    click("a:contains('Foo Inc.')");
    click("a:contains('Delete Company')");
  });
  andThen(function() {
    assert.equal($.trim($('.companies .s-element-item span').text()), 'No company yet!');
  });
});


test('company edit your theme', function(assert) {
  server.create('company');
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

test('company edit your domain', function(assert) {
  server.create('company', { domain: 'foo.com'});
  server.createList('theme', 3);
  andThen(function() {
    visit('/company/1');
    click("button:contains('Edit Domain')");
    fillIn('input#domain', 'acme.com');
    click("button:contains('Done')");
    click('button#save_bottom');
  });
  andThen(function() {
    assert.equal($.trim($('.domain td').text()), 'acme.com');
  });
});