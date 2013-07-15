<?php

function connect_db()
{
  include(__DIR__.'/../config/db.php');
  try {
      return new PDO(
          "mysql:host=$hostname;dbname=$database",
          "$username",
          "$password",
          array(
              PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
              PDO::ATTR_CASE => PDO::CASE_NATURAL,
              PDO::ATTR_ORACLE_NULLS => PDO::NULL_NATURAL,
              PDO::ATTR_STRINGIFY_FETCHES => false,
              PDO::ATTR_EMULATE_PREPARES => false,
              PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
              PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
              PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
          )
      );
  }
  catch (PDOException $except) {
    // TODO: return exit status for RESTful requests
    die("Could not connect to the database: ". $except->getMessage() ."\n");
  }
}

$dbh = connect_db();
?>
