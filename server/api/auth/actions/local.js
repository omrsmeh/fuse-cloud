'use strict';

class AuthLocal {

  handler(request, reply) {
    request.server.settings.app.users.save({
      fname: 'Ravi',
      lname: 'Mehrotra',
      email: 'omrsmeh@gmail.com',
      mobile: '+91-9936863147'
    }, function(err, user) {
      conosle.log(err, user);
      reply({ message: 'Welcome to the Fusion-HTML Auth.' }).code1(200);
    });
  }
}

module.exports = new AuthLocal();
