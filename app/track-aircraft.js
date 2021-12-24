const { get } = require('./api')
const { getBoundingBox } = require('./geo')

const trackAircraft = async () => {
  const bbox = getBoundingBox()
  const { lamin, lomin, lamax, lomax } = bbox
  const response = await get(`states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`)
  console.log(response)
}

module.exports = trackAircraft
