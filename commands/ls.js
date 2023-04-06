import { get } from 'https'
import chalk from 'chalk'
import { dynamicText } from '../utils/dynamicText.js'

const requestOption = {
  hostname: 'api.github.com',
  path: '/gitignore/templates',
  headers: {
    'User-Agent': 'node',
    'Authorization': 'token ' + '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',
  },
}

const action = () => {
  const { stop } = dynamicText('Loading', '.', 300)
  const req = get(
    requestOption,
    res => {
      let data = ''
      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        stop()
        if (res.statusCode !== 200) {
          console.error(chalk.bgRed('something went wrong~ '), '\n', data)
          return
        }
        const result = data.toString('utf-8').replace(/[\[\]"]/g, '').replace(/,/g, ', ')
        console.log(chalk.bgGreen('Supported Languages:') + '\n')
        console.log(result)
      })
    }
  )

  req.on('error', err => {
    console.error(chalk.bgRed('something went wrong~ '), err)
  })
}

export default {
  command: 'ls',
  description: 'List all kinds of git ignore templates',
  action,
}