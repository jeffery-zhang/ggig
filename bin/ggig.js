#!/usr/bin/env node

import path from 'path'
import chalk from 'chalk'
import { globSync } from 'glob'
import { program } from 'commander'

const dirname = path.resolve()
const paths = globSync('./commands/*.js')

const setCommand = async () => {
  const promises = []
  paths.map(cmdPath => {
    console.log(cmdPath)
    promises.push(
      new Promise(async resolve => {
        try {
          const { default: obj } = await import(`file://${path.join(dirname, cmdPath)}`)
          const cmd = program
            .command(obj.command)
            .description(obj.description)
            .action(obj.action)
  
          obj.options && obj.options.map(opt => {
            cmd.option(...opt)
          })
          resolve()
        } catch(err) {
          console.error(chalk.bgRed(err))
          process.exit(1)
        }
      })
    )
  })

  await Promise.all(promises)
}

const start = async () => {
  await setCommand()

  program.parse()
}

start()
