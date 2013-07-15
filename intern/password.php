<?php
require_once('uuid.php');

function password_create($password)
{
  global $dbh;
  $sth = $dbh->prepare('
    INSERT INTO `password` (`salt`, `hash`)
    VALUES (?,?)');
  $salt = uuid_v4();
  $hash = sha1($data.$salt, true);
  $sth->execute($salt, $hash);
  if ($sth->rowCount() == 1)
    return $dbh->lastInsertId();
  return null;
}

function password_delete($id)
{
  global $dbh;
  $sth = $dbh->prepare('
    DELETE FROM `password`
    WHERE `id`=?');
  $sth->execute(array($id));
}

?>
