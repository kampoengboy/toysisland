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
	       	name:req.param('name'),
	       	phone:req.param('phone'),
	       	organization : req.param('organization'),
	       	comments : req.param('comments')
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
	                html : '<p>Hai, Admin. Seseorang dengan kriteria sebagai berikut : <br> Nama : '+usrObj.name + '<br>Organisasi : '+usrObj.organization+'<br>Email : '+ usrObj.email +'<br>Telepon : '+usrObj.phone+'<br><br>Memberikan komentar sebagai berikut:<br><br><p>'+usrObj.comments+'</p></p>'
	            };
	         var MailOptions2 = {
	                from:'Toys Island <official.toysisland@gmail.com>',
	                to : usrObj.email,
	                subject : 'Subscriber Toys Island',
	                html : '<p>Hai.. Terima kasih telah mengirimkan email kepada kami. Ikuti terus perkembangan kami di <a href="http://toysisland.herokuapp.com">toysisland.herokuapp.com</a> atau kunjungi langsung toko kami....</p>'
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

