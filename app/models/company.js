import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  domain: DS.attr('string'),
  theme: DS.attr('string')
});
