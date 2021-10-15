install:
	npm install

link:
	npm link

publish: 
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest

test-coverage:
	npx -n --experimental-vm-modules jest --coverage --coverageProvider=v8

node:
	nvm use 14.18.1