import chalk from 'chalk'
import { request } from '../utils/request.js'

const action = async () => {
  try {
    const path = '/gitignore/templates'
    const data = await request(path)
    const result = data.toString('utf-8').replace(/[\[\]"]/g, '').replace(/,/g, ', ')
    console.log(chalk.bgGreen('Supported Languages:') + '\n')
    console.log(result)
  } catch (err) {
    console.error(chalk.bgRed('Access Token is empty~ '), err)
    process.exit(1)
  }
}

export default {
  command: 'ls',
  description: 'List all kinds of git ignore templates',
  action,
}