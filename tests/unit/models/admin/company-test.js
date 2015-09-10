import { moduleForModel, test } from 'ember-qunit';

moduleForModel('admin/company', 'Unit | Model | admin/company', {
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});
