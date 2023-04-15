# GGIG (Generate Git Ignore)
Generate a '.gitignore' template automaticly with just one command!

You can find ggig souce code at <https://github.com/jeffery-zhang/ggig>
# Installation
``` bash
npm install ggig
```
Or, you can globally install ggig
``` bash
npm install -g ggig
```
# Usage
Use 'gen' command to generate '.gitignore' template:
``` bash
ggig gen --template Java

# or
ggig gen -t Java
```
If you don't pass 'template' parameter, the default template is Node.

You can use 'ls' command to check all supported template.
``` bash
ggig ls
```
