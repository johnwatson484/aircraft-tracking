const amqp = require('amqplib/callback_api')
const { message } = require('./config')

const publishAircraft = async (aircraft) => {
  const { host, port, username, password, exchange } = message
  amqp.connect(`amqp://${username}:${password}@${host}:${port}/`, function (error0, connection) {
    if (error0) {
      throw error0
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1
      }

      channel.assertExchange(exchange, 'fanout', {
        durable: false
      })

      for (const msg of aircraft) {
        channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)))
      }
      connection.close()
    })
  })
}

module.exports = publishAircraft
