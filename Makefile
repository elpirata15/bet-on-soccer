# meta-targets
META = setup install export backup
.PHONY: $(META) default

# global vars
MYSQL_    = source config/mysql.env && $(1) --host="$$hostname" --user="$$username" --password="$$password" "$$database"
MYSQL     = $(call MYSQL_,mysql)
MYSQLDUMP = $(call MYSQL_,mysqldump)


# do nothing by default
default:
	@echo Please specify a meta-target: $(META)

# install database structure
install: mysql/structure.sql | setup
	$(MYSQL) $<

# generate config
setup: config/db.php

# generate database backup
backup: file = backup/$(shell date +%F_%H-%M-%S).sql
export: file = mysql/structure.sql
backup: options = extended-insert replace no-create-info skip-add-drop-table \
	dump-date comments comments skip-disable-keys \
	default-character-set=utf8 set-charset tz-utc quote-names
export: options = no-data skip-add-drop-table \
	skip-dump-date skip-comments skip-disable-keys \
	default-character-set=utf8 set-charset tz-utc quote-names
backup export: | setup
	@mkdir -p $(dir $(file))
	$(MYSQLDUMP) $(addprefix --,$(options)) --result-file="$(file)"

# setup database configuration
config/db.php: config/mysql.env
	perl -pe 'BEGIN { print "<?php\n" }; s/^\s*(\w+)=(\w*)(.*)$$/\$$$$1="$$2"$$3;/; END { print "?>"}' <$< >$@

config/mysql.env:
	@mkdir -p $(dir $@)
	@echo MYSQL database configuration:
	@	read -p "  Hostname: " hostname &&\
		read -p "  Username: " username &&\
		read -p "  Password: " password &&\
		read -p "  Database: " database &&\
		echo -E "hostname=$$hostname" >> $@ &&\
		echo -E "username=$$username" >> $@ &&\
		echo -E "password=$$password" >> $@ &&\
		echo -E "database=$$database" >> $@

