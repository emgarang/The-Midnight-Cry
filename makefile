.PHONY: lint lint-fix lint-js lint-js-fix lint-py lint-py-fix install build clean

# Run both JS/TS + Python linters
lint: lint-js lint-py

# Fix both JS/TS + Python
lint-fix: lint-js-fix lint-py-fix

# JS/TS lint (Prettier, non-failing)
lint-js:
	-npx prettier@3.6.2 --check . --ignore-path .prettierignore

# JS/TS auto-fix
lint-js-fix:
	npx prettier@3.6.2 --write . --ignore-path .prettierignore

# Python lint (black)
lint-py:
	-black --check .

# Python auto-fix
lint-py-fix:
	black .

# Install Python dependencies
install:
	pip install -r requirements.txt

# Build site (adjust as needed)
build:
	echo "Building site..."

# Clean cache
clean:
	rm -rf .ruff_cache
