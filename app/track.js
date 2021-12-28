const { get } = require('./api')
const { getBoundingBox } = require('./geo')
const publish = require('./publish')
const { frequency } = require('./config')

const start = async () => {
  try {
    console.log('Tracking')
    await trackAircraft()
  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(start, frequency)
  }
}

const trackAircraft = async () => {
  const bbox = getBoundingBox()
  const { lamin, lomin, lamax, lomax } = bbox
  const response = await get(`states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`)
  const transformedResponse = transformResponse(response)
  await publish(transformedResponse)
}

const transformResponse = (response) => {
  return response.states?.map(x => ({
    icao24: x[0],
    callSign: x[1].trim() || 'UNKNOWN',
    originCountry: x[2],
    timePosition: x[3],
    lastContact: x[4],
    longitude: x[5],
    latitude: x[6],
    barometricAltitude: x[7],
    onGround: x[8],
    velocity: x[9],
    trueTrack: x[10],
    verticalRate: x[11],
    sensors: x[12],
    geoAltitude: x[13],
    squawk: x[14],
    spi: x[15],
    positionSource: x[16]
  })) ?? []
}

module.exports = {
  start
}
