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
    username: '',
    password: ''
};

// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

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
app.get('/api/get_history/:tagId/:time/:period', function (req, res) {

       var Robinhood = require('robinhood')(credentials, function(){
      // Robinhood.historicals(req.param("tagId"), '5minute', 'week', function(err, response, body){
	   Robinhood.historicals(req.param("tagId"), req.param("time"), req.param("period"), function(err, response, body){	  
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

app.post('/api/order_buy', function (req, res) {
    if(!checkToken(req.body.token)){
        res.send('Invalid token');
        return;
    }

     var Robinhood = require('robinhood')(credentials, function(){
           var options = {
              type: req.body.type,
              quantity: req.body.quantity,
              bid_price: req.body.bid_price,
              stop_price: req.body.stop_price,
              trigger:req.body.trigger,
              instrument: {
                  url: req.body.url,
                  symbol: req.body.symbol
              }
              // // Optional:
              // trigger: String, // Defaults to "gfd" (Good For Day)
              // time: String,    // Defaults to "immediate"
              // type: String     // Defaults to "market"
          }
          Robinhood.place_buy_order(options, function(error, response, body){
              if(error){
                  console.error(error);
                   res.send(error);
              }else{
                  console.log(body);
                  res.send(body);
              }
          })
      });

});

app.post('/api/order_sell', function (req, res) {
    if(!checkToken(req.body.token)){
        res.send('Invalid token');
        return;
    }

     var Robinhood = require('robinhood')(credentials, function(){
           var options = {
              type: req.body.type,
              quantity: req.body.quantity,
              bid_price: req.body.bid_price,
              stop_price: req.body.stop_price,
              trigger:req.body.trigger,
              instrument: {
                  url: req.body.url,
                  symbol: req.body.symbol
              }
              // // Optional:
              // trigger: String, // Defaults to "gfd" (Good For Day)
              // time: String,    // Defaults to "immediate"
              // type: String     // Defaults to "market", "limit"
          }
          Robinhood.place_sell_order(options, function(error, response, body){
              if(error){
                  console.error(error);
                   res.send(error);
              }else{
                  console.log(body);
                  res.send(body);
              }
          })
      });

});

app.post('/api/stoploss', function (req, res) {
    if(!checkToken(req.body.token)){
        res.send('Invalid token');
        return;
    }

     var Robinhood = require('robinhood')(credentials, function(){
           var options = {
              type: "market",
              quantity: req.body.quantity,
              bid_price: "",
              stop_price: req.body.stop_price,
              trigger:"stop",
              instrument: {
                  url: req.body.url,
                  symbol: req.body.symbol
              }
          }
          Robinhood.place_sell_order(options, function(error, response, body){
              if(error){
                  console.error(error);
                   res.send(error);
              }else{
                  console.log(body);
                  res.send(body);
              }
          })
      });

});

app.post('/api/stop_limit_sell', function (req, res) {
    if(!checkToken(req.body.token)){
        res.send('Invalid token');
        return;
    }

     var Robinhood = require('robinhood')(credentials, function(){
           var options = {
              type: "limit",
              quantity: req.body.quantity,
              bid_price: req.body.bid_price,
              stop_price: req.body.stop_price,
              trigger:"stop",
              instrument: {
                  url: req.body.url,
                  symbol: req.body.symbol
              }
          }
          Robinhood.place_sell_order(options, function(error, response, body){
              if(error){
                  console.error(error);
                   res.send(error);
              }else{
                  console.log(body);
                  res.send(body);
              }
          })
      });

});

app.post('/api/stop_limit_buy', function (req, res) {
    if(!checkToken(req.body.token)){
        res.send('Invalid token');
        return;
    }

     var Robinhood = require('robinhood')(credentials, function(){
           var options = {
              type: "limit",
              quantity: req.body.quantity,
              bid_price: req.body.bid_price,
              stop_price: req.body.stop_price,
              trigger:"stop",
              instrument: {
                  url: req.body.url,
                  symbol: req.body.symbol
              }
          }
		  console.log(options);	
          Robinhood.place_buy_order(options, function(error, response, body){
              if(error){
                  console.error(error);
                   res.send(error);
              }else{
                  console.log(body);
                  res.send(body);
              }
          })
      });

});




app.post('/api/order_cancel', function (req, res) {
    if(!checkToken(req.body.token)){
        res.send('Invalid token');
        return;
    }
     var Robinhood = require('robinhood')(credentials, function(){
           var options = {
               cancel: req.body.cancel
          };

          Robinhood.cancel_order(options, function(error, response, body){
              if(error){
                  console.error(error);
                   res.send(error);
              }else{
                  console.log(body);
                  res.send(body);
              }
          })
      });

});


app.post('/api/orders', function (req, res) {
    if(!checkToken(req.body.token)){
        res.send('Invalid token');
        return;
    }

       var Robinhood = require('robinhood')(credentials, function(){
            Robinhood.orders( function(err, response, body){
                if(err){
                    console.error(err);
                     res.send(err);
                }else{
                    console.log("quote_data");
                    console.log(body);
                     res.send(body);
                }
            })
        });

});

app.post('/api/orders_status', function (req, res) {
    if(!checkToken(req.body.token)){
        return;
    }

       var Robinhood = require('robinhood')(credentials, function(){
			Robinhood.url(req.body.url, function(err, response, body){
                if(err){
                    console.error(err);
                     res.send(err);
                }else{
                    console.log("quote_data");
                    console.log(body);
                     res.send(body);
                }
            })
        });

});

app.post('/api/dividends', function (req, res) {
    if(!checkToken(req.body.token)){
        res.send('Invalid token');
        return;
    }

     var Robinhood = require('robinhood')(credentials, function(){
          
          Robinhood.dividends( function(error, response, body){
              if(error){
                  console.error(error);
                   res.send(error);
              }else{
                  console.log(body);
                  res.send(body);
              }
          })
      });

});

app.get('/api/get_news/:symbol', function (req, res) {
    
     var Robinhood = require('robinhood')(credentials, function(){
          
          Robinhood.news(req.param("symbol"), function(error, response, body){
              if(error){
                  console.error(error);
                   res.send(error);
              }else{
                  console.log(body);
                  res.send(body);
              }
          })
      });

});


app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file
});



function checkToken(t){
  var token = '54!81%527*^%@97S_375caw05';
  if(t == token){
    return true;
  }
  return false;
}





   