const wordUtils = require('./utils/motivacional.json')
module.exports = () => ({
  async handlerMethod (message) {
    const index = Math.floor(Math.random() * (wordUtils.length - 1))
    message.reply(wordUtils[index])
  }
})
