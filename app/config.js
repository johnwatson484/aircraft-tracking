const Joi = require('joi')
const envs = ['development', 'test', 'production']

// Define config schema
const schema = Joi.object().keys({
  env: Joi.string().valid(...envs).default(envs[0]),
  api: Joi.object({
    protocol: Joi.string().default('https'),
    host: Joi.string().default('opensky-network.org/api'),
    username: Joi.string(),
    password: Joi.string()
  }),
  geo: Joi.object({
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    distance: Joi.number().default(2000)
  }),
  message: Joi.object({
    host: Joi.string(),
    port: Joi.number().default(5672),
    username: Joi.string(),
    password: Joi.string(),
    exchange: Joi.string().default('aircraft-tracked')
  }),
  frequency: Joi.number().default(30000) // 30 seconds
})

// Build config
const config = {
  env: process.env.NODE_ENV,
  api: {
    protocol: process.env.API_PROTOCOL,
    host: process.env.API_HOST,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD
  },
  geo: {
    longitude: process.env.GEO_LONGITUDE,
    latitude: process.env.GEO_LATITUDE,
    distance: process.env.GEO_DISTANCE
  },
  message: {
    host: process.env.MESSAGE_HOST,
    port: process.env.MESSAGE_PORT,
    username: process.env.MESSAGE_USERNAME,
    password: process.env.MESSAGE_PASSWORD,
    exchange: process.env.MESSAGE_EXCHANGE
  },
  frequency: process.env.FREQUENCY
}

// Validate config
const { error, value } = schema.validate(config)

// Throw if config is invalid
if (error) {
  throw new Error(`The server config is invalid. ${error.message}`)
}

value.isDev = value.env === 'development'

module.exports = value
