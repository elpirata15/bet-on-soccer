<?php
require_once('db.php');
require_once('password.php');

/*
 * Sanity checks
 */

function is_valid_email($str)
{
    // the actual regex has a size of several kilobyte:
    // http://code.iamcal.com/php/rfc822/full_regexp.txt
    return preg_match("/^[^.].*@.+[a-zA-Z]{2,4}$/", $str);
}

function is_valid_username($str)
{
    return is_valid_email($str);
}

function is_valid_password($str)
{
    $len = strlen($str);
    return $len >= 1 && $len <= 32;
}


/*
 * User management
 */

function user_create($user)
{
  global $dbh;
  $sth = $dbh->prepare('
    INSERT INTO `user` (`name`,`password`,`alias`)
    VALUES (?,?,?)');

  $sth->execute(array(
    $user['username'],
    password_create($user['password']),
    $user['alias']
  ));

  return $sth->rowCount() == 1;
}

function user_exists($name)
{
  global $dbh;
  $sth = $dbh->prepare('
    SELECT 1
    FROM `user`
    WHERE LOWER(`name`)=LOWER(?)');
  $sth->execute(array($name));
  return $sth->fetch();
}

?>
