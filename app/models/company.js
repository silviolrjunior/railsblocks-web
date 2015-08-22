import DS from 'ember-data';

var Company = DS.Model.extend({
  name: DS.attr(),
  domain: DS.attr()
});


Company.reopenClass({
  FIXTURES: [
    { id: 1, name: "name1", domain: "domain1.com"},
    { id: 2, name: "name2", domain: "domain2.com"},
    { id: 3, name: "name3", domain: "domain3.com"}
  ]
});

export default Company;