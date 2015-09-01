import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({

  name: function(i) {                  // and functions
    return 'theme_' + (i+1);
  }
});
