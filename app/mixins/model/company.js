import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  name: DS.attr('string'),
  domain: DS.attr('string'),
  theme: DS.attr('string')
});