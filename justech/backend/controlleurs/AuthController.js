
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
process.env.SECRET_KEY = 'secret'

module.exports={
    register:function(req,res) {
        const userData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password, 
        }
    
        User.findOne({
            email: req.body.email
        }).then(user => {
                if (!user) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        userData.password = hash
                        User.create(userData)
                            .then(user => {
                                   console.log(User)
                                res.json({ status: user.email + ' saif!' })
                            })
                            .catch(err => {
                                res.send('error: ' + err)
                            })
                    })
                           }
                else {
                    res.json({ error: 'User already exists' })
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
      },


      login:function(req,res) {
        console.log(req.body.email,req.body.password)
        User.findOne({
            email: req.body.email
        }).then(user => {
            console.log(user)
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        payload = {
                            _id: user._id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            role :user.role,
                            isEmailVerified:user.isEmailVerified,
                            
                            expires_in : 24  *  60  *  60
                        }
                                            
                                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                                    expiresIn: 24  *  60  *  60
                                })
                               
                                payload = {
                                    _id: user._id,
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    email: user.email,
                                    role :user.role,
                                    isEmailVerified:user.isEmailVerified,
                                    token : token,
                                    expires_in : 24  *  60  *  60
                                }
                                res.send(payload);   
                             }
                           
                        
                        
                       
                     else {
                        res.json({ error: "User does not exist" })
                    }
                } else {
                    res.json({ error: "User does not exist" })
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
      },

      

      profile:function(req,res) {
   var user_id = jwt.verify(req.headers.authorization.split(' ')[1],process.env.SECRET_KEY)._id
         
    },


}
















  /* newProfile = new Profile({photoprofile:req.protocol+"://"+req.headers.host+"/document/images/profile/default_profile.jpg",photocouverture:req.protocol+"://"+req.headers.host+"/document/images/couverture/default_couverture.jpg"});
                                newProfile.save(function (err) {});
                               /* console.log(newProfile)
                                console.log(conditions)
                                  var conditions = { _id: user._id }
                                    , update =  { profile_id: newProfile._id }
                                    , options = { multi: true };

                                User.updateOne(conditions, update, options,callback)
                  -              function callback (err, numAffected) {
                                   // console.log(numAffected)
                                  }
                                  */
