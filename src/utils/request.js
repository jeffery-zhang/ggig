import { get } from 'https'
import chalk from 'chalk'
import { dynamicText } from './dynamicText.js'

export const request = (path) => {
  if (!path) {
    console.error(chalk.bgRed('something went wrong~ '))
    process.exit(1)
  }
  const options = {
    hostname: 'api.zhj13.com',
    path: `/api${path}`,
    headers: {
      'User-Agent': 'node',
    },
  }
  const { stop } = dynamicText('Loading', '.', 300)

  return new Promise((resolve, reject) => {
    const req = get(
      options,
      res => {
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          stop()
          if (res.statusCode !== 200) {
            console.error(chalk.bgRed('something went wrong~ '), '\n', res.statusCode, '\n', data)
            reject()
          }
          resolve(data)
        })
      }
    )
    
    req.on('error', err => {
      stop()
      console.error(chalk.bgRed('something went wrong~ '), err)
      reject(err)
    })
  })
}