# Markdown Links

This library reads and analyzes files in Markdown format, to verify the links they contain and to report some statistics.

## Installation

```bash
$ npm install md-validator

$ npm install -g md-validator

$ npm install @tatianatorog/md-validator

```

## CLI (Command Line Interface - Interfaz de Línea de Comando)
Get _markdowns links_ with this command:

```bash
$ npx md-validator <path-to-file> [options]
```

_For example:_

```bash
$ npx md-validator ./some/example.md

./some/example.md http://ubu.com/2/3/ Link to something
./some/example.md https://deco.net/algun-doc.html some file
./some/example.md http://google.com/ Google
```

## OPTIONS

##### `-v | --validate`

- **Pass _validate_ option to check & validate all markdown's link(s):**

```bash
$ npx md-validator ./some/example.md -v
$ npx md-validator ./some/example.md --validate

./some/example.md http://ubu.com/2/3/ ok 200 Link to something
./some/example.md https://deco.net/algun-doc.html fail 404 some file
./some/example.md http://google.com/ ok 301 Google
```

##### `-s | --stats`

- **Pass _stats_ option to get the total & unique(s) of markdown's link(s):**

```bash
$ npx md-validator ./some/ -s
$ npx md-validator ./some/example.md --stats

Total: 3
Unique: 3
```

##### `-v -s | --validate --stats`

- **You can pass _both_ options for totals & link's status:**

```bash
$ npx md-validator some -v -s
$ npx md-validator some/example.md --validate --stats

Total: 3
Unique: 3
Broken: 1

```

---

## Dependencies
- Chalk
- Commander
- Cfonts
- Axios
