var userController = require('./userController.js'),
    passport = require('passport');



module.exports = function (app) {
  // app === userRouter injected from middlware.js


    app.get('/auth/github',
      function(req, res, next) {
        console.log('hit the route');
        next();
      },
    passport.authenticate('github'),
    function(req, res){});

    console.log('authrequest');
    app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/signin' }),
    function(req, res) {
      // Successful authentication, redirect home.
      console.log(res);
      res.redirect('/links');
    });


  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
};
