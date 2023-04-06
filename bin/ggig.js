#!/usr/bin/env node

import { globSync } from 'glob'
import { program } from 'commander'

const paths = globSync('./commands/*.js')

const setCommand = async () => {
  const promises = []
  paths.map(cmdPath => {
    promises.push(
      new Promise(async resolve => {
        const { default: obj } = await import(`../${cmdPath}`)
        const cmd = program
          .command(obj.command)
          .description(obj.description)
          .action(obj.action)

        obj.options && obj.options.map(opt => {
          cmd.option(...opt)
        })
        resolve()
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
