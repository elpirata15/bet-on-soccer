<?php

function json_response($array)
{
  header('cache-control: no-cache, must-revalidate');
  header('content-type: application/json; charset=utf-8');
  echo json_encode(
    $array,
    JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE
  );
  return json_last_error();
}

?>
