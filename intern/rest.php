<?php
require_once('json.php');

// DOS exceptions
class BadRequest extends Exception {}
class Unauthorized extends Exception {}
class Forbidden extends Exception {}
class MethodNotAllowed extends Exception {}


function RESTful_service($provider)
{
  $method = $_SERVER['REQUEST_METHOD'];
  $allowed = function ($method) use ($provider) {
    return method_exists($provider, $method);
  };

  try {
    if (!$allowed($method))
      throw new MethodNotAllowed();

    $request = strtolower($method) == 'post'
      ? $_POST
      : $_GET;

    $response = call_user_func(array($provider, $method), $request, $_REQUEST);

    json_response($response);
  }

  catch (BadRequest $e) {
    header("HTTP/1.1 401 Bad Request");
  }

  catch (Unauthorized $e) {
    // use "Basic" for simplicity since we are not 
    // actually doing HTTP authentication anyway:
    header('WWW-Authenticate: Basic realm="Dummy"');
    header("HTTP/1.1 401 Unauthorized");
  }

  catch (Forbidden $e) {
    header("HTTP/1.1 403 Forbidden");
  }

  catch (MethodNotAllowed $e) {
    $methods = join(', ', array_filter(
      array('POST', 'DELETE', 'PUT', 'GET'),
      $allowed
    ));

    header("HTTP/1.1 405 Method Not Allowed");
    header("Allow: $methods");
  }
}

?>
