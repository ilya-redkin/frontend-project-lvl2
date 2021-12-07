### Hexlet tests and linter status:
[![Actions Status](https://github.com/ilya-redkin/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ilya-redkin/frontend-project-lvl2/actions)
[![Actions Status](https://github.com/ilya-redkin/frontend-project-lvl2/workflows/my-check/badge.svg)](https://github.com/ilya-redkin/frontend-project-lvl2/actions)
<a href="https://codeclimate.com/github/ilya-redkin/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/b4ffe891a4a220f0177f/maintainability" /></a>
<a href="https://codeclimate.com/github/ilya-redkin/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/b4ffe891a4a220f0177f/test_coverage" /></a>

## Gendiff
The application compares to files (json or yaml/yml) and displays the difference in one of the chosen output formats

## Installation

```sh
$ npm install gendiff -g
```

## Usage
```sh
gendiff [options] <file1> <file2>
```
## Help
```sh
gendiff -h, --help
```
## Available output formats
```sh
gendiff -f, --format <type>
1. stylish (default)
2. plain
3. json
```
## Contributing
Pull requests are welcome.

## Example of the comparison of the two JSON files - 'stylish' format is used by default:
<a href="https://asciinema.org/a/8n13LMRhDDFMESHFNbnqkoP8y" target="_blank"><img src="https://asciinema.org/a/8n13LMRhDDFMESHFNbnqkoP8y" /></a>

## Example of the comparison of the two JSON files - 'plain' format:
<a href="https://asciinema.org/a/Sxk8N4P1tAbLuW3LRRA6ZXES2" target="_blank"><img src="https://asciinema.org/a/Sxk8N4P1tAbLuW3LRRA6ZXES2" /></a>

## Example of the comparison of the two JSON files - 'json' format:
<a href="https://asciinema.org/a/BRbghfEwwGJaoHfGf6rZ2bCUn" target="_blank"><img src="https://asciinema.org/a/BRbghfEwwGJaoHfGf6rZ2bCUn" /></a>

## Example of the comparison of the two YAML files - 'stylish' format is used by default:
<a href="https://asciinema.org/a/oUjSzBW7Hpl3vjhcaG6UlCnzG" target="_blank"><img src="https://asciinema.org/a/oUjSzBW7Hpl3vjhcaG6UlCnzG" /></a>
