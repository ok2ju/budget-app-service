SHELL = /bin/bash
WORKDIR := $(PWD)

MONGO_VERSION = 4.0.26

default: mongo
.PHONY: default

mongo:
	@ echo "---> Running mongoDB ..."
	@ docker run --name budget-mongo --rm -p 27017:27017 -d mongo:$(MONGO_VERSION)
.PHONY: mongo
