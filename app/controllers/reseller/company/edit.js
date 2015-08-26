import Ember from 'ember';

export default Ember.Controller.extend({
  themes: ["black", "orange", "red"],

  actions: {
    selectTheme(value){
      this.set('model.theme', value);
    }
  }
});