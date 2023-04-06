import { get } from 'https'
import path from 'path'
import chalk from 'chalk'
import fs from 'fs'
import { ensureFile } from 'fs-extra'

const checkFile = async () => {
  let exists
  try {
    await ensureFile('./.gitignore')
    exists = true
  } catch (err) {
    exists = false
  }
  return exists
}

const requestOption = (template) => ({
  hostname: 'api.github.com',
  path: `/gitignore/templates/${template}`,
  headers: {
    'User-Agent': 'node',
    'Authorization': 'token ' + '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',
  },
})

const action = async ({ template }) => {
  const exists = await checkFile()

  const req = get(requestOption(template), res => {
    let data = ''
    res.on('data', chunk => {
      data += chunk
    })

    res.on('end', async () => {
      if (res.statusCode !== 200) {
        console.error(chalk.bgRed('something went wrong~ '), '\n', data)
        return
      }
      const { name, source } = JSON.parse(data)
      if (await checkFile()) {
        const content = fs.readFileSync('./.gitignore', 'utf-8')
      }
    })
  })
}

export default {
  command: 'gen',
  description: 'Create .gitignore template',
  action,
  options: [
    ['-t --template <template>', 'Choose a template to write a .gitignore file', 'Node']
  ],
}
