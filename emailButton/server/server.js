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
};

transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

app.use(methodOverride());
app.use(bodyParser());
//app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);