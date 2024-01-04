
.PHONY:
start:
	deno task start

.PHONY: lint
lint:
	deno lint --ignore=./static/confetti.min.js,./_fresh/

.PHONY: build
build:
	deno task build

