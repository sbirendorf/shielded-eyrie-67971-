
$data = array('token'=>'','cancel'=> '/orders/34b0b086-ad44-440a-ba80-c1da2f3ab8b5/cancel/');


$data = array('token'=>'','type'=>'limit','quantity'=>1,'bid_price'=>10.12,
'url'=>'https://api.robinhood.com/instruments/ebab2398-028d-4939-9f1d-13bf38f81c50/','symbol'=>'FB');
$data = http_build_query($data);
      $handle = curl_init('http://localhost:3000/api/order_cancel');
      curl_setopt($handle, CURLOPT_POST, true);
      curl_setopt($handle, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($handle, CURLOPT_POSTFIELDS, $data);
      $response = curl_exec($handle);
      //echo ($response);
      $response = json_decode($response,true);
