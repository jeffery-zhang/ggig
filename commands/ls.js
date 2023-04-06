import { get } from 'https'
import chalk from 'chalk'
import { dynamicText } from '../utils/dynamicText.js'
import { genToken } from '../utils/genToken.js'

const requestOption = (ggigToken) => {
  if (!ggigToken) {
    console.error(chalk.bgRed('Access Token is empty~ '))
    process.exit(1)
  }
  return {
    hostname: 'api.github.com',
    path: '/gitignore/templates',
    headers: {
      'User-Agent': 'node',
      'Authorization': 'token ' + ggigToken,
    },
  }
}

const action = async () => {
  try {
    const ggigToken = await genToken()
    const option = requestOption(ggigToken)
    const { stop } = dynamicText('Loading', '.', 300)
    const req = get(
      option,
      res => {
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })

        res.on('end', () => {
          stop()
          if (res.statusCode !== 200) {
            console.error(chalk.bgRed('something went wrong~ '), '\n', res.statusCode, '\n', data)
            return
          }
          const result = data.toString('utf-8').replace(/[\[\]"]/g, '').replace(/,/g, ', ')
          console.log(chalk.bgGreen('Supported Languages:') + '\n')
          console.log(result)
        })
      },
    )

    req.on('error', err => {
      console.error(chalk.bgRed('something went wrong~ '), err)
    })
  } catch(err) {
    console.error(chalk.bgRed('Access Token is empty~ '), err)
    process.exit(1)
  }
}

export default {
  command: 'ls',
  description: 'List all kinds of git ignore templates',
  action,
}