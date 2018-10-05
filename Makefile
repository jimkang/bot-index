include config.mk

HOMEDIR = $(shell pwd)
SSHCMD = ssh $(USER)@$(SERVER)
APPDIR = /usr/share/nginx/html/smidgeo.com/bots

build:
	node tools/build-index.js bot-list.json page-template.html entry-template.html > index.html

pushall: sync
	git push origin master

sync:
	scp app.css $(USER)@$(SERVER):$(APPDIR)
	scp index.html $(USER)@$(SERVER):$(APPDIR)

prettier:
	prettier --single-quote --write "**/*.js"


