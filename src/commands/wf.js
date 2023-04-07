import chalk from 'chalk'
import { writeFile } from 'fs'

const action = async () => {
  const filename = '.gitignore'
  writeFile(filename, '', err => {
    if (err) console.error(chalk.bgRed('something went wrong~ '), err)
    else console.log(chalk.bgGreen(`file ${filename} has been created!`))
  })
}

export default {
  command: 'wf',
  description: 'Create an empty .gitignore file',
  action,
}
