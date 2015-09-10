import { moduleForModel, test } from 'ember-qunit';

moduleForModel('manager/company', 'Unit | Model | manager/company', {
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});
