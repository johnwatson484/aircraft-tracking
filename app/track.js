const { get } = require('./api')
const { getBoundingBox } = require('./geo')
const publish = require('./publish')
const { frequency } = require('./config')
const { transformAircraftResponse } = require('./transform')

const start = async () => {
  try {
    await trackAircraft()
  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(start, frequency)
  }
}

const trackAircraft = async () => {
  console.log('Scanning')
  const bbox = getBoundingBox()
  const { lamin, lomin, lamax, lomax } = bbox
  const aircraft = await get(`states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`)
  const transformedResponse = transformAircraftResponse(aircraft)
  if (transformedResponse.length) {
    await publish(transformedResponse)
  }
}

module.exports = {
  start
}
