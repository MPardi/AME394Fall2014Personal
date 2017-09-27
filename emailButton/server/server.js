const nodemailer = require('nodemailer');

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;

app.get("/", function (req, res) {
    console.log("GET req arrived")
    res.send("hello world")
});

var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "successpastatime@gmail.com",
        pass: "Snow7w17"
    }
});

var mailOptions = {
    from: "Michael Pardi ✔ <successpastatime@gmail.com", // sender address
    to: "michaelthomaspardi@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Shitted pants, Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});

app.use(methodOverride());
app.use(bodyParser());
//app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
