require('dotenv').config();
const nodemailer = require("nodemailer");
var email='saifeddinhajji@gmail.com';
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user:email,
      pass: 'cvb22985027',
    }
  });

module.exports={

   
    email:function(req,res){
        console.log(req.body)
        let mailOptions={
            from:'saifeddinhajji@gmail.com',
            to:req.body.to,
            subject:req.body.subject,
            text:req.body.text
        }
                transporter.sendMail(mailOptions,function(err,data){
                if(err){
                    res.send('error:'+ err)
                }
                else{
                console.log(process.env.email,process.env.PASSWORD)
                    res.send(data);
                }
                })
                    },

      
                    total:function(req,res){
                        console.log(req.body)
                        let mailOptions={
                            from:req.body.email,
                            to:req.body.to,
                            subject:req.body.subject,
                            text:req.body.text
                        }
                                transporter.sendMail(mailOptions,function(err,data){
                                if(err){
                                    res.send('error:'+ err)
                                }
                                else{
                                console.log(process.env.email,process.env.PASSWORD)
                                    res.send(data);
                                }
                                })
                                    },

                                    email:function(req,res){
                                        console.log(req.body)
                                        let mailOptions={
                                            from:'saifeddinhajji@gmail.com',
                                            to:req.body.to,
                                            subject:req.body.subject,
                                            text:req.body.text
                                        }
                                                transporter.sendMail(mailOptions,function(err,data){
                                                if(err){
                                                    res.send('error:'+ err)
                                                }
                                                else{
                                                console.log(process.env.email,process.env.PASSWORD)
                                                    res.send(data);
                                                }
                                                })
                                                    }

    
}

//step one
/*
});*/
