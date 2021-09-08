install:
	npm install

link:
	npm link

publish: 
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest --watch