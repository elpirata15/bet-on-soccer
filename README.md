### Bet on Soccer

#### Description

Web-interface for bets on soccer tournament results with friends.


#### Install

The first thing you have to do is setup the MYSQL access settings.
Copy the file `template/mysql.env` to `config/mysql.env` and adjust it to
your needs.

There is a `make` target for this purpose:

    make setup

**You should use an empty mysql database.**

Afterwards you need to create the tables to the database:

    make install


#### Maintenance

Is mainly performed via the web-interface.

For convenience there is a backup `make` target:

    make backup
