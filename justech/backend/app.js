var express =require("express")
var cors =require("cors")
var path = require('path')
var bodyParser =require("body-parser")
var app =express()
var mongoose =require("mongoose")
const jwt = require("jsonwebtoken")
//var auth = require('./middleware/islogger');
var cookieParser = require('cookie-parser'); 
var Users =require('./routes/users')
var Email =require('./routes/emais')

var originsWhitelist = [
    'http://localhost:4200', 
    
      //this is my front-end url for development
  ];
  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }
  //here is the magic
  app.use(cors(corsOptions));


mongoose.Promise = global.Promise;
var port = process.env.PORT || 5000
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))
const URL =require('./database/db');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(URL.db)
.then(() => console.log("MongoDB is connected"))
.catch(err =>console.log(err))

mongoose.set('useCreateIndex', true);

/*var corsOptions = {
    origin: 'http://localhost:4200/',
    methods: 'GET',
    optionsSuccessStatus: 200 }
    app.use(cors(corsOptions))*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'document')));
app.use('/document/images/profile',express.static('./document/images/profile'))
app.use('/document/images/couverture',express.static('./document/images/couverture'))
app.use('/document/pdf',express.static('./document/pdf'))

app.use('/users/', Users);
app.use('/sendemail',Email);


//run server 
app.listen(port, () => {
    console.log("server is running" +port)
})
module.exports = app;


