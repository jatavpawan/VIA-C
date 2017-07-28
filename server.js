 
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var multer  =   require('multer');
var methodOverride = require('method-override');
var nodemailer = require('nodemailer');
var jwt    = require('jsonwebtoken');
var pdf = require('html-pdf');
var fs = require('fs');
var html = fs.readFileSync('./public/templates/chat-detail.html', 'utf8');

var config = require('./config');
var User   = require('./app/models/user');
var Property   = require('./app/models/property');
var InvestmentDetails   = require('./app/models/investment_details');
var http = require('http');
// =======================
// configuration =========
// =======================


var port = process.env.PORT || 8082;
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.set('superSecret', config.secret);
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use('/public/uploads',express.static(__dirname + '/public/uploads'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, x-access-token, X-Requested-With, Content-Type, Accept");
    next();
});


var transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "growthpoolagreements@gmail.com",
      pass: "GPTech123"
    }
});

// file upload code
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        if(file.mimetype == 'image/png' || file.mimetype == 'uploads/png')
          cb(null, file.fieldname + '-' + datetimestamp + '.png')
        else
          cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var uploadMultiple = multer({ //multer settings
        storage: storage
    }).array('file',20);

var uploadSingle = multer({ //multer settings
        storage: storage
    }).single('file');

/** API for single file upload */
app.post('/uploadPhoto', function(req, res) {
    uploadSingle(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json(req.file);
    })

});

/** API for single file upload */
app.post('/api/uploadPhotos', function(req, res) {
    uploadMultiple(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json(req.files);
    })

});

app.get('/', function(req, res) {
    res.sendfile('public/homepage/index.html');
});

app.get('/app', function(req, res) {
    res.sendfile('./growth-pool-admin/public/app.html');
});

app.get('/emailConfirmation', function(req, res) {
    res.sendfile('./growth-pool-admin/public/email-confimation.html');
});

app.get('/EmailVerification/:code', function(req, res, next) {
  var value = req.param('code');
  console.log("=====EmailVerification===",value)
    User.findByIdAndUpdate(value, {status:'ACTIVE'}, {new: true}
    , function(err, user) {
        if (err)
        {
            res.writeHead(302, {
            'Location': '/emailConfirmation'
            });
            res.end();
        }
        else {
            res.writeHead(302, {
            'Location': '/emailConfirmation'
            });
            res.end();
        }
    });
});



app.get('/setupAdmin', function(req, res) {

  var nick = new User({ 
    name: 'admin', 
    password: 'Dzyjat6',
    description: 'Demo ad',
    admin: true 
  });

  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

app.get('/setupUser', function(req, res) {

  var nick = new User({ 
    first_name: 'admin', 
    last_name: 'Dzyjat6',
    email: 'irshadgouri92@gmail.com',
    password: 'Demoad'
  });

  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

app.get('/setProperty1', function(req, res) {

  var property1 = { 
    city: 'Toronto', 
    province: 'Ontorio',
    image_url: 'public/uploads/property1.jpg',
    term: 36, // in month
    min_invest_amount: 1000,
    anual_return: 10, // in %
    end_date: 'Wed July 27 2017 12:21:38 GMT+0530 (IST)',
    funding_amount: 200000, // in dollar
    property_description: 'A new mixed-use condominium project currently in pre-construction with hotel and retail uses located at 15 Mercer Street by John Street in downtown Toronto, Ontario by Madison Homes and designed by Teeple Architects Inc. Nobu Condos are going to be the King West Entertainment District next big thing. Proposed condo suites and a high-end boutique hotel, with 884 condos in the tower portion as well as roughly 150 hotel suites. A state of the art fitness centre and meeting spaces will be included along with residential lobbies, the hotel lobby, a restaurant and a café on the ground level.',
    address: '15 Mercer Street, Toronto,Nobu',
    property_description_address: 'Nobu Hotel and Residences',
    property_strategy_city: 'Nobu',
    ownership_type: 'Residential',
    property_size: '650 Sq.Ft.',
    beds: '1+1',
    baths: '1',
    investors: [{
      "name":"GrowthPool",
      "Investment_amount": 20000,
      "investor_id":"sadfasfd456584546"
    }]

  };

  Property.create(property1, function(err, property) {
      if (err)
          console.log(err);
      res.json(property);
  });

});

app.get('/setProperty2', function(req, res) {

  var property1 = { 
    city: 'M City', 
    province: 'Ontorio',
    image_url: 'public/uploads/property2.jpg',
    term: 36, // in month
    min_invest_amount: 1000,
    anual_return: 8, // in %
    end_date: 'Wed July 27 2017 12:21:38 GMT+0530 (IST)',
    funding_amount: 120000, // in dollar
    property_description: 'M City Condos is a new master planned community per-construction Condos project located at 460 Burnhamthorpe Rd W In Mississauga. The Project Including condos units, Retail Shops and Public Park. The Major Intersection are Marvis Road and Burnhamthorpe Rd W. M City Condos Developed Rogers Real Estate Development Limited, a private holding company owned by the Rogers family. The Developer Invest $1.5 billion For this amazing Project. Architecture By CORE Architects. The First Tower Will be build is North East Corner, Total 60 Stories and 784 units.The development is scheduled for completion in 2022.',
    address: '15 Mercer Street, Toronto,Nobu',
    property_description_address: 'M2 City Condos',
    property_strategy_city: 'M City',
    ownership_type: 'Residential',
    property_size: '650 Sq.Ft.',
    beds: '1+1',
    baths: '1',
    investors: [{
      "name":"GrowthPool",
      "Investment_amount": 12000,
      "investor_id":"sadfasfd456584546"
    }]

  };

  Property.create(property1, function(err, property) {
      if (err)
          console.log(err);
      res.json(property);
  });

});

/** API for sending mail */
app.post('/forgotPassword', function(req, res) {

  
  
    var forgot_email = req.body.email;
    User.findOne({ 'email' : forgot_email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
            return res.send(err);

        // check to see if theres already a user with that email
        if (!user) {
            return res.json({"message":"Email is not registered."});
        } else {
            var msg = {
              html: "<b>Hello!</b><p>Your password for GP account is <strong>" + user.password + "</strong</p>.",
              createTextFromHtml: true,
              from: '"GrowthPool" <growthpoolagreements@gmail.com>',
              to: forgot_email,
              subject: "GrowthPool Credentials"
            };
            transport.sendMail(msg, function (err) {
              if (err) {
                return;
              }


              return res.json({"message":"Password has been sent to your Email."});
            });
        }

    });

});

app.post('/emailCheck', function (req, res) {
    console.log(req.body);
    User.findOne({ email: req.body.email }, function (err, user) {

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            res.json({ success: true, message: 'Email available' });
        }
    })
})

// create user
app.post('/createUser', function(req, res) {
  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      User.create(req.body, function(err, user) {
          if (err)
              res.send(err);
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: 86400*30
          });
          if(user) {
              var msg = {
                html: "<b>Hello!</b><p>Click <a href='http://138.197.159.97:8958/EmailVerification/" + user._id + "'>here</a> to verify email address for GrowthPool account.",
                createTextFromHtml: true,
                from: '"GrowthPool" <growthpoolagreements@gmail.com>',
                to: user.email,
                subject: "GrowthPool Email Confirmation"
              };
              transport.sendMail(msg, function (err) {
                if (err) {
                  return;
                }


              });
              res.json({"user":user,"token":token});
          }
      });
    } else if (user) {
        res.json({ success: false, message: 'Email or user name already exist.' });
    }

  });

});

// create social user
app.post('/createSocialUser', function(req, res) {
  // find the user
  User.findOne({
    $or: [
        {social_id: req.body.social_id}
    ]
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      User.create(req.body, function(err, user) {
          if (err)
              res.send(err);
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: 86400*30
          });
          if(user) {
              res.json({"user":user,"token":token});
          }
      });
    } else if (user) {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 86400*30
        });
        res.json({"user":user,"token":token});
    }

  });

});

app.post('/authenticate', function(req, res) {

        // find the user
        User.findOne({email: { $regex : new RegExp(req.body.email, "i") }}, function(err, user) {

          if (err) throw err;

          if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
          } else if (user) {
            if (user.password != req.body.password) {
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } 
            else if (user.status != 'ACTIVE') {
              res.json({ success: false, message: 'Please verify your email.' });
            }
            else {
              var token = jwt.sign(user, app.get('superSecret'), {
                expiresIn: 86400*30
              });
              res.json({"user":user,"token":token});
            }

          }

        });
});

app.post('/adminLogin', function (req, res) {

    var email=req.body.email.toLowerCase();
    var password = req.body.password;
   
    if (email == "growthpool@admin.com" && password == "imran@gp786") {
        var token = jwt.sign({id:'adminLogin'}, app.get('superSecret'), {
            expiresIn: 86400 * 30
        });
        res.json({ token: token ,message:"success"});
    } else {
        res.json({ token: '', message: "failure" });
    }
})
// API ROUTES -------------------

var apiRoutes = express.Router(); 

apiRoutes.use(function(req, res, next) {
  console.log("====req.headers['x-access-token']===",req.headers['x-access-token'])
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Session Expired, Please Login Again.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.send({
        message: 'Session Expired, Please Login Again.'
    });
    
  }
});
//getalluser
apiRoutes.post('/getAllUser', function (req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    })

})
// update user
apiRoutes.put('/updateUser', function(req, res) {
    User.findByIdAndUpdate(req.body._id, req.body, {new: true}
    , function(err, user) {
        if (err)
            res.send(err);
        user.message = 'Updated Successfully.';
        res.json(user);
    });
});

// get user
apiRoutes.post('/getUser', function(req, res) {
    User.find({"_id":req.body._id}, function(err, user) {
        if (err)
            res.send(err);
          user = user[0];
        res.json(user);
    });
});



// Properties API

apiRoutes.post('/createProperty', function(req, res) {
    
    Property.create(req.body, function(err, property) {
        if (err)
            console.log(err);
        res.json(property);
    });
    
});

// update property
apiRoutes.put('/updateProperty', function(req, res) {
    Property.findByIdAndUpdate(req.body._id, req.body, {new: true}
    , function(err, property) {
        if (err) {
            res.send(err);
        }
        res.json(property);
      
    });
});

// get properties
apiRoutes.post('/getProperties', function(req, res) {
    Property.find(req.body,function(err, properties) {
        if (err)
            res.send(err)   
        res.json(properties);
            
    });
});

// delete property
apiRoutes.delete('/removeProperty', function(req, res) {
    Ininvite.remove({ _id : req.body._id
    }, function(err, properties) {
        if (err)
            res.send(err);
        res.json({message : 'Property Deleted Successfully.'});
    });
});


// Investment API


// create investment
apiRoutes.post('/makeInvestment', function (req, res) {
    InvestmentDetails.create(req.body, function(err, investment) {
        if (err)
            res.send(err)
        res.json({"investment_id":investment._id});
    });
});

// update property
apiRoutes.put('/updateInvestment', function(req, respp) {


    InvestmentDetails.findById(req.body.investment_id, function(err, investment) {
        if (err)
            res.send(err);
          var monthNames = [
              "January", "February", "March",
              "April", "May", "June",
              "July", "August", "September",
              "October", "November", "December"
          ];
         // console.log(investment);
        var html = "<h5>INVESTOR AGREEMENT</h5>" + 
            "<div style='text-align:center;'><img src='public/images/pdf-icon.png'></div><br>" +
            "<p>This Investor Agreement (the &quot;Agreement&quot;) made and entered into this " + new Date().getDate() + " day of " + (new Date().getMonth() + 1) + "," +
              new Date().getFullYear() + "(the Execution Date), between: " +  investment.first_name + " "  +  investment.last_name + " of " +  investment.property_description_address + 
              " (Herewith known as the <b>‘Investor’</b>) and Growth Pool, Inc. (Herewith known as <b>‘Growth Pool’</b>).</p>" + 

              "<p>I " +  investment.first_name + " " +  investment.last_name + " am investing CAN$ " + investment.Investment_amount +"</p>" +

              "IN" + 

              "<p><b>Growth Pool</b> property " + investment.property_description_address +  " for the duration of the investment term of  " +  investment.term +
                ". I understand <b>Growth Pool</b> takes no responsibility for market conditions, changes of the economy or real estate market performance. I am fully aware that all investments have risks, and it is possible for me to lose part, if not all, of my investment.</p>" + 


                "<p>I hereby give full authority to Growth Pool to manage the property with my absolute confidence without prejudice.</p>" + 

                 "<p>I, " +  investment.first_name + " " +  investment.last_name + ", acknowledge all the information I have provided is true and of legal precedent.</p>" +



                 "<p>The <b>‘Investor’</b> agrees to keep the details of this agreement strictly confidential and warrants that the details of this agreement will not be disclosed to anyone except the <b>‘Investor’</b>, their accountant and/or consultant and will not be used for any purpose other than in connection with the completion of this transaction.</p>" +


                 "<p>I, " +  investment.first_name + " " +  investment.last_name + ", acknowledge I have not been solicited into investing and am doing so at my own discretion and have had ample time to perform my own due-diligence on this particular investment.</p>" +


                 "<p><b>Growth Pool</b> takes no responsibility for any 3 rd party or referral influence on the <b>Investor</b>.</p>" +


                 "<p>From the date hereof until the closing date or the earlier termination of this agreement shall not, nor shall it permit any person acting on behalf of the <b>Investor</b>, to contact or enter into negotiations with third parties regarding the sale or other disposition of the property or any part thereof, unless specifically provided in this agreement.</p>" +

                 "<p>In case of death <b>Growth Pool</b> shall make the necessary efforts to contact the <b>Investor’s</b> next-of- kin and beneficiaries that the Investor has added to their account profile. Failure to contact next-of- kin within 18 after the term of this investment will result in <b>Growth Pool</b> acquiring the <b>Investor</b>’s funds.</p>" +
                 "<p></p>" +

                 "<p>I understand <b>Growth Pool</b> has the right to sell the investment property prior to said investment projected exit date, when in the best interest of all parties and investors involved or delay at its own unfettered discretion up to 12 months after the proposed exit date. Such delay to be based on market conditions at the time and deemed to be in the best interest of the <b>Investor</b>.</p>" +
                 "<p></p>" +

                 "<p>I understand <b>Growth Pool</b> has full control of all its investments.</p>" +

                 "<p><b>By investing with Growth Pool, I give full authority to <b>Growth Pool</b>, Inc. to invest my funds in property </b>" +  investment.property_description_address +  ".</p>" +

                 "<p>I agree to not take any legal action against and/or hold harmless <b>Growth Pool</b> and its affiliates, third party businesses, companies, builders, developers, owners, directors, and/or partners.</p>" +

                 "<p>Any action taken against <b>Growth Pool</b> can and will result in legal action against the Investor.</p>" +
                 
                 "<p>Growth Pool reserves the right to terminate and ban any member violating any of its terms, conditions, policies, rules and enforcements.</p>" +

                 "<p>Any investment made with <b>Growth Pool</b> has a 48 hour period for refund except for within 48 hours of the investment funding closing. Choosing to invest in a property with Growth Pool within 48 hours of its closing renders this 48 hour refund period null and void.</p>" +

                 "<p>I understand <b>Growth Pools</b> fee&#39;s and equity stake in all investments. <b>Growth Pool</b> is responsible for arranging mortgages, property management, renting units / properties, insurance, purchases and sales of all of investments etc. <b>Growth Pool</b> does not take responsibility for any loss or injury claimed to be a result of <b>Growth Pools</b> actions or behavior. Furthermore any individual accessing <b>Growth Pools</b> confidential and private website, platform, and mobile app for but not limited to, personal gain, defamation, advertising, marketing, media, or use of any kind can and will be prosecuted.</p>" +

                 "<p>I hereby acknowledge <b>Growth Pool</b> has not solicited me in any way.</p>" +

                 "<p><b>Growth Pool</b> takes no responsibility for the accuracy, completeness, reliability, suitability, of any of the information provided on our website, platform, mobile app, social-media, graphics, advertising, marketing, emails, all third-party information or claims supplied.</p>" +

                 "<p>By signing this document, I hereby am in agreeance of this document and all of <b>Growth Pools</b> TERMS&amp;CONDITIONS, POLICIES, RULES &amp; REGULATIONS, AND INVESTOR OATH.</p>" +

                 "<p>I have read and understand this document in all its entirety. I understand I can access this document via the platform under documents in my investor-tracking section of my profile. Any complaints or concerns can be directed at info@growthpool.com. Any errors or corrections may also be directed at info@growthpool.com.</p>" +


                 "<p style='color:#FF4040;'><b>Investor Oath</b>: I undoubtedly pledge my allegiance and affirmation to <b>Growth Pool Investment Club</b>.</p>" +

                 "<p style='color:#FF4040;'>I solemly swear that all the information I have provided is of legal precedent. I understand any illegal activity,and not limited to identity fraud,money laundering,illegal behaviour,fake accounts,multiple accounts and more, will be reported to the proper authorities and may result in the entire loss of my investment and prosecution. I understand any information collected on <b>Growth Pool</b> Inc via its website,platform,mobile-app,social media and more is strictly for members use only, and cannot be used or sold to any media outlet, any advertisement or marketing firm without the full written consent of <b>Growth Pool Inc.</b></p>" +

                 "<br><p><img src=" + investment.signature_image + "></p>" +

                 "<p>Signature : " +  investment.first_name + " " +  investment.last_name + ". <span style='margin-left:100px'>Date: " + monthNames[new Date().getMonth()] + " " + new Date().getDate() + "," +
              new Date().getFullYear() + "</span></p>";
        console.log('created pdf');
        var options = { format: 'Letter', timeout: 30000 };
                var user_email = investment.email;
                 
                pdf.create(html, options).toFile('./public/uploads/investment-agreement-'+ req.body.investment_id +'.pdf', function(err, res) {
                  if (err) return console.log(err);
                  console.log(res.filename); // { filename: '/app/businesscard.pdf' }
                  req.body.pdf_path = res.filename;
                  var pd_path = res.filename;

                  console.log("++++++createdpdf++++++++");
                  console.log(req.body.investment_id);
                  InvestmentDetails.findByIdAndUpdate(req.body.investment_id, req.body, {new: true}
                  , function(err, investment) {
                      if (err) {
                          res.send(err);
                      }
                      respp.json({message:"Investment Successful."});
                     // console.log(investment);
                   //   console.log('investment success')
                      console.log("line no. 619",investment.property_id)
                      // saving investor detail in property schema
                      Property.find({ "_id": investment.property_id }, function (err, property) {

                        if (err)
                            res.send(err)   
                      var  property1 = property[0];
                      console.log("line no. 626",property);
                          console.log("line no. 627",property1)
                          //console.log(property.investors);
                        property1.investors.push({
                            "Investment_amount": investment.Investment_amount,
                            "investor_id":investment.user_id
                          })
                        Property.findByIdAndUpdate(investment.property_id, {"investors": property1.investors}, {new: true}
                        , function(err, property) {
                            if (err) {
                                res.send(err);
                            }
                            //res.json(property);
                          
                        });
                            
                    });
                      console.log('mail sent')

                      var attachment = [];
                      attachment.push({path: pd_path}); 
                      var msg = {
                        html: "<b>Hello!</b><p>Please find attachment for investment agreement.",
                        createTextFromHtml: true,
                        from: '"GrowthPool" <growthpoolagreements@gmail.com>',
                        to: user_email,
                        subject: "GrowthPool Investment Agreement",
                        attachments: attachment
                      };
                      transport.sendMail(msg, function (err) {
                        if (err) {
                          return;
                        }


                      });
                  });
               
                });

        
    });
                
    
});

// get investments
apiRoutes.post('/getInvestments', function(req, res) {
  console.log("====req.body====",req.body)
    InvestmentDetails.find({"user_id":req.body.user_id},function(err, investments) {
        if (err)
            res.send(err)
            console.log("====investments====",investments)   
        res.json(investments);
            
    });
});

apiRoutes.post('/getAllInvestments', function (req, res) {
    console.log("+++++++++++called++++++++++");
    InvestmentDetails.find({}, function (err, investments) {
        if (err) 
            res.send(err)
            console.log(investments);
            res.json(investments);
        
    })

})





app.use('/api', apiRoutes);


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Running at ' + port);
var options = { format: 'Letter' };

pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' } 
});