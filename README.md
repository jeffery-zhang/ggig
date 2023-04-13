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
Before using the ggig command line, please make sure you have a Github Access Token, which can be configured in environment variables.
``` bash
# In macOS/Linux
export GGIG_TOKEN=<access token>

# In Windows
set GGIG_TOKEN=<access token>
```
Or, you can directly input your access token in the prompt dialog

If you don't have any Github Access Token, see <https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token> to generate a key.

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
