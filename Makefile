
.PHONY:
start:
	deno task start

.PHONY: lint
lint:
	deno lint --ignore=./static/confetti.min.js,./_fresh/
	deno check ./main.ts

.PHONY: build
build:
	deno task build

