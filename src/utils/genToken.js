import readline from 'readline'
import chalk from 'chalk'

const genToken = async () => new Promise((resolve, reject) => {
  // 从环境变量中获取token
  let ggigToken = process.env.GGIG_TOKEN

  if (!ggigToken) {
    const link = 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'

    console.log(chalk.magenta('There is no Access Token in environment variable.'))
    console.log('If you don\'t have any github Access Token, see ' + chalk.blue(link) + ' to generate one...')
    console.log('If you have a github Access Token, you can set it in your environment variable.')
    console.log('In macOS/Linux:\n', chalk.blue('export GGIG_TOKEN=<access token>'))
    console.log('In Windows:\n', chalk.blue('set GGIG_TOKEN=<access token>'))

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question('Please input your Access Token: ', token => {
      console.log('Your Access Token is: ', token)
      ggigToken = token
      rl.close()
      if(ggigToken) resolve(ggigToken)
      else reject()
    })
  } else resolve(ggigToken)
})

export { genToken }
