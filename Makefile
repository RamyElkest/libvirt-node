# Shim wrapper around npm to allow for familiar build targets

NPM ?= npm

all:
	$(NPM) i

install: all

generate:
	$(NPM) run generate

clean:
	$(NPM) run clean

check:
	$(NPM) run test

docker:
	docker build .
