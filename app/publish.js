const amqp = require('amqplib')
const { message } = require('./config')

const publish = async (aircraft) => {
  const { host, port, username, password, exchange } = message
  const connection = await amqp.connect(`amqp://${username}:${password}@${host}:${port}`)
  const channel = await connection.createChannel()
  await channel.assertExchange(exchange, 'fanout', {
    durable: true,
  })

  for (const msg of aircraft) {
    const body = JSON.stringify(msg)
    await channel.publish(exchange, '', Buffer.from(body))
    console.log('Flight detected:', body)
  }
  await channel.close()
  await connection.close()
}

module.exports = publish
