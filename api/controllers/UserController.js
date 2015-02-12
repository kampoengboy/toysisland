/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var nodemailer = require('nodemailer');
module.exports = {
	sendemail : function(req,res,next){
	       var usrObj = {
	       	email : req.param('email'),
	       }
	       var transporter = nodemailer.createTransport({
	              service:'Gmail',
	              auth:{
	                user:'official.toysisland@gmail.com',
	                pass:'tanlieching'
	              }
	        });
	        var MailOptions = {
	                from:usrObj.email,
	                to : 'official.toysisland@gmail.com',
	                subject : 'Subscriber Toys Island',
	                html : '<p>Hai, Admin. Seseorang menginginkan info launching dari Toys Island dengan Email : '+ usrObj.email +'</p>'
	            };
	         var MailOptions2 = {
	                from:'Toys Island <official.toysisland@gmail.com>',
	                to : usrObj.email,
	                subject : 'Subscriber Toys Island',
	                html : '<p>Hai.. Terima kasih telah mengirimkan email kepada kami. Kami akan langsung mengabari anda jikalau situs kami sudah online.</p>'
	            };
	        transporter.sendMail(MailOptions,function(error,info){
	              if (error) {
	                console.log(error);
	              } else {
	                console.log('Message sent: '+info.response);
	              }
	        });
	        transporter.sendMail(MailOptions2,function(error,info){
	              if (error) {
	                console.log(error);
	              } else {
	                console.log('Message sent: '+info.response);
	              }
	        });
	        return res.redirect('/');
	}
};

