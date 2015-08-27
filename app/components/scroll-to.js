import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  anchor: '',

  scrollTo: function () {
    var anchor = this.get('anchor'),
      $el = Ember.$(anchor);

    if ($el) {
      Ember.$('body').animate({
        scrollTop: $el.offset().top
      }, 1000);
    }
  }.on('click')
});