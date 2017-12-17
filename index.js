// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var request = require('request');
// configuration =================

app.use(express.static(__dirname + '/public'));                 // set the static files location /public
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

//global 
var credentials = {
    username: 'sbirendorf',
    password: 'bir38116554'
};
// listen (start app with node server.js) ======================================
// app.listen(5000);
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
console.log("listening on port 5000");
app.get('/api/get_price/:tagId', function (req, res) {

       var Robinhood = require('robinhood')(credentials, function(){
            Robinhood.quote_data(req.param("tagId"), function(err, response, body){
                if(err){
                    console.error(err);
                     res.send(err);
                }else{
                    console.log("quote_data");
                    console.log(body);
                     res.send(body);
                    //{
                    //    results: [
                    //        {
                    //            ask_price: String, // Float number in a String, e.g. '735.7800'
                    //            ask_size: Number, // Integer
                    //            bid_price: String, // Float number in a String, e.g. '731.5000'
                    //            bid_size: Number, // Integer
                    //            last_trade_price: String, // Float number in a String, e.g. '726.3900'
                    //            last_extended_hours_trade_price: String, // Float number in a String, e.g. '735.7500'
                    //            previous_close: String, // Float number in a String, e.g. '743.6200'
                    //            adjusted_previous_close: String, // Float number in a String, e.g. '743.6200'
                    //            previous_close_date: String, // YYYY-MM-DD e.g. '2016-01-06'
                    //            symbol: String, // e.g. 'AAPL'
                    //            trading_halted: Boolean,
                    //            updated_at: String, // YYYY-MM-DDTHH:MM:SS e.g. '2016-01-07T21:00:00Z'
                    //        }
                    //    ]
                    //}
                }
            })
        });

});
app.get('/api/get_history/:tagId', function (req, res) {

       var Robinhood = require('robinhood')(credentials, function(){
       Robinhood.historicals(req.param("tagId"), '5minute', 'week', function(err, response, body){
        if(err){
            console.error(err);
             res.send(err);
        }else{
            console.log("got historicals");
            console.log(body);
            res.send(body);
                    //{
                    //    results: [
                    //        {
                    //            ask_price: String, // Float number in a String, e.g. '735.7800'
                    //            ask_size: Number, // Integer
                    //            bid_price: String, // Float number in a String, e.g. '731.5000'
                    //            bid_size: Number, // Integer
                    //            last_trade_price: String, // Float number in a String, e.g. '726.3900'
                    //            last_extended_hours_trade_price: String, // Float number in a String, e.g. '735.7500'
                    //            previous_close: String, // Float number in a String, e.g. '743.6200'
                    //            adjusted_previous_close: String, // Float number in a String, e.g. '743.6200'
                    //            previous_close_date: String, // YYYY-MM-DD e.g. '2016-01-06'
                    //            symbol: String, // e.g. 'AAPL'
                    //            trading_halted: Boolean,
                    //            updated_at: String, // YYYY-MM-DDTHH:MM:SS e.g. '2016-01-07T21:00:00Z'
                    //        }
                    //    ]
                    //}
                }
            })
        });

});

// app.get('/api/get_history/:tagId', function (req, res) {

//        var Robinhood = require('robinhood')(credentials, function(){
//        Robinhood.historicals(req.param("tagId"), '5minute', 'week', function(err, response, body){
//         if(err){
//             //console.error(err);
//             // res.send(err);
//             console.log('errot');
//         }else{
//             console.log("got historicals");
//            // console.log(body);
//            // res.send(body);
//                     //{
//                     //    results: [
//                     //        {
//                     //            ask_price: String, // Float number in a String, e.g. '735.7800'
//                     //            ask_size: Number, // Integer
//                     //            bid_price: String, // Float number in a String, e.g. '731.5000'
//                     //            bid_size: Number, // Integer
//                     //            last_trade_price: String, // Float number in a String, e.g. '726.3900'
//                     //            last_extended_hours_trade_price: String, // Float number in a String, e.g. '735.7500'
//                     //            previous_close: String, // Float number in a String, e.g. '743.6200'
//                     //            adjusted_previous_close: String, // Float number in a String, e.g. '743.6200'
//                     //            previous_close_date: String, // YYYY-MM-DD e.g. '2016-01-06'
//                     //            symbol: String, // e.g. 'AAPL'
//                     //            trading_halted: Boolean,
//                     //            updated_at: String, // YYYY-MM-DDTHH:MM:SS e.g. '2016-01-07T21:00:00Z'
//                     //        }
//                     //    ]
//                     //}
//                 }
//             })
//         });

// });

app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file
});



