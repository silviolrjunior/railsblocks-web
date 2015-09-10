export default function() {
  this.urlPrefix = 'http://localhost:4200';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.timing = 400;      // delay for each request, automatically set to 0 during testing

  //Manager Companies Routes
  this.get('/manager/companies');
  this.get('/manager/companies/:id');
  this.post('/manager/companies', function(db, request){
    var attrs = JSON.parse(request.requestBody);
    attrs = attrs["manager/company"];
    var newCompany = db.companies.insert(attrs);
    return {
      company: newCompany
    };
  });
  this.put('/manager/companies/:id', function(db, request){
    var id = request.params.id;
    var attrs = JSON.parse(request.requestBody);
    attrs = attrs["manager/company"];
    attrs.id = +id;
    db.companies.update(id, attrs);
    return {
      company: attrs
    };
  });
  this.delete('/manager/companies/:id');

  //Admin Companies Routes
  this.get('/themes');
  this.get('/admin/companies');
  this.get('/admin/companies', function(db) {
    var company = db.companies.find(1);

    return {
      company: company
    };
  });
  this.put('/admin/companies/:id', function(db, request){
    var id = request.params.id;
    var attrs = JSON.parse(request.requestBody);
    attrs = attrs["admin/company"];
    attrs.id = +id;
    db.companies.update(id, attrs);
    return {
      company: attrs
    };
  });

  //Login Routes should have urlPrefix blank
  this.urlPrefix = '';
  this.post('/managers/sign_in', function(){
    return { token: 'token'};
  });
  this.post('/admins/sign_in', function(){
    return { token: 'token'};
  });  
}
