import chalk from 'chalk'

export const dynamicText = (text, repeat, timeout = 500, maxCount = 3) => {
  if (!text || !repeat) console.log(chalk.bgRed('The arguments text and repeat are required!'))
  
  let count = 0
  let interval = null

  process.stdout.write(text)

  interval = setInterval(() => {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(chalk.blue(`${text}${repeat.repeat(count)}`))
    count = (count + 1) % (maxCount + 1)
  }, timeout)

  return {
    stop() {
      clearInterval(interval)
      interval = null
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
    }
  }
}