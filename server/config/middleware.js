var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    passport    = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter = express.Router();
  var linkRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use(passport.initialize());


  app.use('/api/users', userRouter); // user user router for all user request

  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  app.use('/', linkRouter); // user link router for link request
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their perspective route files
  require('../users/userRoutes.js')(userRouter);
  require('../links/linkRoutes.js')(linkRouter);
};
var GITHUB_CLIENT_ID = "51ae1593f2e61182a1a9";
var GITHUB_CLIENT_SECRET = "1283671c930ed1c42ed9bbf08292266e2bfac2a3";

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/links"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));
