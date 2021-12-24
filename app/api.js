const wreck = require('@hapi/wreck')
const { api } = require('./config')

const get = async (path) => {
  const { protocol, host, username, password } = api
  const { payload } = await wreck.get(`${protocol}://${username}:${password}@${host}/${path}`, getConfiguration())
  return payload
}

const getConfiguration = (token = '') => {
  return {
    json: true
  }
}

module.exports = {
  get
}
