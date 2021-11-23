/* eslint-disable node/no-path-concat */
const { readdirSync } = require('fs')

const loadDictionary = Symbol('loadDictionary')
const kmethods = Symbol('kmethods')
const kprepareMessages = Symbol('kprepareMessages')
class MessagesDictionary {
  constructor () {
    this[kmethods] = this[loadDictionary]()
  }

  [loadDictionary] () {
    return readdirSync(`${__dirname}/../../modules/`).map(module => {
      const handler = (require(`${__dirname}/../../modules/${module}/main.js`))
      return {
        [module.trim().toLowerCase()]: handler()
      }
    })
  }

  [kprepareMessages] (message) {
    if (!message.content.startsWith(process.env.DISCORD_PREFIX)) return null
    return message.content.trim().toLowerCase().replace(process.env.DISCORD_PREFIX, '')
  }

  readMessage (message) {
    const preparedModuleName = this[kprepareMessages](message)
    if (!preparedModuleName) return false
    const handler = this[kmethods].find(module => module[preparedModuleName])
    if (handler) return handler[preparedModuleName].handlerMethod(message)
  }
}
module.exports = new MessagesDictionary()
