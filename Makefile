.PHONY:
start:
	deno task start

.PHONY: lint
lint:
	deno task check

.PHONY: fmt
fmt:
	deno fmt

.PHONY: fmt-check
fmt-check:
	deno fmt --check

.PHONY: test
test: lint fmt
	deno test

.PHONY: build
build:
	deno task build

