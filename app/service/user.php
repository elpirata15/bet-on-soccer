<?php
require_once('../../intern/user.php');
require_once('../../intern/rest.php');

/*
 * Process RESTful request
 */

class UserService
{
  function post($request)
  {
    $user = array(
      'username' => trim($request['username']),
      'password' =>      $request['password'],
      'alias'    => trim($request['alias'])
    );

    $fail = array();

    // check input
    if (!is_valid_username($user['username']))
      $fail[] = 'Invalid username';
    else if (user_exists($user['username']))
      $fail[] = 'Username already exists';

    if (!is_valid_password($user['password']))
      $fail[] = 'Invalid password';

    if (empty($fail)) {
      if (user_create($user)) {
        // TODO: login
        return array('success' => true);
      }

      $fail[] = 'Internal error - please retry or contact administrator';
    }

    return array(
      'success' => false,
      'remark' => $fail
    );
  }

  function delete($request)
  {
    return array(
      'success' => false,
      'remark' => 'Not implemented'
    );
  }
}

RESTful_service(new UserService());
?>
