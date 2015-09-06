import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: function generateCompanyName() {
    return faker.company.companyName();
  },
  theme: "base",
  domain: "mydomain.railblocks.io"
});
