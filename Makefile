
.PHONY:
start:
	deno task start

.PHONY: lint
lint:
	deno task check

.PHONY: build
build:
	deno task build

