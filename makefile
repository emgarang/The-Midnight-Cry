.PHONY: lint lint-fix lint-js lint-js-fix lint-py lint-py-fix install build clean

# Run both JS/TS + Python linters
lint: lint-js lint-py

# Fix both JS/TS + Python
lint-fix: lint-js-fix lint-py-fix

# JS/TS lint
lint-js:
	-npx prettier@3.6.2 --check .

lint-js-fix:
	npx prettier@3.6.2 --write .

# Python lint
lint-py:
	ruff check .

# Python auto-fix
lint-py-fix:
	ruff check --fix .

install:
	pip install -r requirements.txt

clean:
	rm -rf .ruff_cache
