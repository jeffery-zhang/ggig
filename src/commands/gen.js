import { get } from 'https'
import chalk from 'chalk'
import fs from 'fs'
import { dynamicText } from '../utils/dynamicText.js'
import { genToken } from '../utils/genToken.js'

const requestOption = (ggigToken, template) => {
  if (!ggigToken) {
    console.error(chalk.bgRed('Access Token is empty~ '))
    process.exit(1)
  }
  return {
    hostname: 'api.github.com',
    path: `/gitignore/templates/${template}`,
    headers: {
      'User-Agent': 'node',
      'Authorization': 'token ' + ggigToken,
    },
  }
}

const action = async ({ template }) => {
  try {
    const ggigToken = await genToken()
    const exists = fs.existsSync('.gitignore')
    const option = requestOption(ggigToken, template)
    const { stop } = dynamicText('Loading', '.', 300)
    const req = get(
      option,
      res => {
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })
    
        res.on('end', async () => {
          stop()
          if (res.statusCode !== 200) {
            console.error(chalk.bgRed('something went wrong~ '), '\n', res.statusCode, '\n', data)
            return
          }
          const { name, source } = JSON.parse(data)
          if (exists) {
            fs.appendFileSync('./.gitignore', `# git ignore template for ${name}\n${source}\n`)
          } else {
            fs.writeFileSync('./.gitignore', `# git ignore template for ${name}\n${source}\n`)
          }
          console.log(chalk.bgGreen(`git ignore file template for ${name} has been created!`))
        })
      },
    )

    req.on('error', err => {
      stop()
      console.error(chalk.bgRed('something went wrong~ '), err)
    })
  } catch(err) {
    console.error(chalk.bgRed('Access Token is empty~ '), err)
    process.exit(1)
  }
  
}

export default {
  command: 'gen',
  description: 'Create .gitignore template',
  action,
  options: [
    ['-t --template <template>', 'Choose a template to write a .gitignore file', 'Node']
  ],
}
