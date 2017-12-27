$data = array('token'=>'','type'=>'market','quantity'=>1,'bid_price'=>"",'stop_price'=>77,"trigger"=>"",
'url'=>'https://api.robinhood.com/instruments/50810c35-d215-4866-9758-0ada4ac79ffa/','symbol'=>'MSFT');

$data = http_build_query($data);
      $handle = curl_init('http://localhost:3000/api/order_sell');
      curl_setopt($handle, CURLOPT_POST, true);
      curl_setopt($handle, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($handle, CURLOPT_POSTFIELDS, $data);
      $response = curl_exec($handle);
      echo ($response);
      $response = json_decode($response,true);
	  var_dump($response);






	  trigger = stop // stop loss

	  stop loss 
	  $data = array('token'=>'54!81%527*^%@97S_375caw05','quantity'=>1,'bid_price'=>"",'stop_price'=>80,
'url'=>'https://api.robinhood.com/instruments/50810c35-d215-4866-9758-0ada4ac79ffa/','symbol'=>'MSFT');


              // // Optional:
              // trigger: String, // Defaults to "gfd" (Good For Day)
              // time: String,    // Defaults to "immediate"
              // type: String     // Defaults to "market", "limit"